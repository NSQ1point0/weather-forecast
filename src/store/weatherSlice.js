import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import mockWeatherData from '../data/mockWeatherData.json';

// Load search history from localStorage
const loadSearchHistory = () => {
  try {
    const history = localStorage.getItem('weatherSearchHistory');
    return history ? JSON.parse(history) : [];
  } catch (error) {
    return [];
  }
};

// Save search history to localStorage
const saveSearchHistory = (history) => {
  try {
    localStorage.setItem('weatherSearchHistory', JSON.stringify(history));
  } catch (error) {
    console.error('Failed to save search history:', error);
  }
};

// Simulate network conditions
const simulateNetworkDelay = () => {
  const isOffline = Math.random() < 0.1; // 10% chance of being "offline"
  const delay = Math.random() * 1000 + 500; // 500-1500ms delay
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isOffline) {
        reject(new Error('Network error'));
      } else {
        resolve();
      }
    }, delay);
  });
};

export const fetchWeatherData = createAsyncThunk(
  'weather/fetchWeatherData',
  async (cityName, { rejectWithValue, getState }) => {
    const maxRetries = 3;
    let retryCount = 0;

    const attemptFetch = async () => {
      try {
        await simulateNetworkDelay();
        
        const cityKey = Object.keys(mockWeatherData.cities).find(
          key => key.toLowerCase() === cityName.toLowerCase()
        );
        
        if (cityKey) {
          return {
            cityName: cityKey,
            data: mockWeatherData.cities[cityKey]
          };
        } else {
          throw new Error(`City "${cityName}" not found. Try: New York, London, Tokyo, Paris, Sydney, Mumbai, or Chennai`);
        }
      } catch (error) {
        if (error.message === 'Network error' && retryCount < maxRetries) {
          retryCount++;
          console.log(`Retry attempt ${retryCount}/${maxRetries} for ${cityName}`);
          await new Promise(resolve => setTimeout(resolve, 1000 * retryCount)); // Exponential backoff
          return attemptFetch();
        }
        throw error;
      }
    };

    try {
      return await attemptFetch();
    } catch (error) {
      if (error.message === 'Network error') {
        return rejectWithValue('Network error. Please check your connection and try again.');
      }
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for selecting from history with transition
export const selectFromHistoryAsync = createAsyncThunk(
  'weather/selectFromHistory',
  async (cityName, { getState }) => {
    const state = getState();
    const historyItem = state.weather.searchHistory.find(
      item => item.cityName.toLowerCase() === cityName.toLowerCase()
    );
    
    if (historyItem) {
      // Add a small delay for transition effect
      await new Promise(resolve => setTimeout(resolve, 300));
      return historyItem;
    }
    
    throw new Error('City not found in history');
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    currentWeather: null,
    searchHistory: loadSearchHistory(),
    loading: false,
    error: null,
    searchedCity: '',
    retryCount: 0,
    isTransitioning: false
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setTransitioning: (state, action) => {
      state.isTransitioning = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isTransitioning = true;
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.loading = false;
        state.currentWeather = action.payload.data;
        state.searchedCity = action.payload.cityName;
        state.retryCount = 0;
        state.isTransitioning = false;
        
        const existingIndex = state.searchHistory.findIndex(
          item => item.cityName.toLowerCase() === action.payload.cityName.toLowerCase()
        );
        
        if (existingIndex !== -1) {
          state.searchHistory.splice(existingIndex, 1);
        }
        
        const newHistoryItem = {
          cityName: action.payload.cityName,
          data: action.payload.data,
          timestamp: Date.now()
        };
        
        state.searchHistory.unshift(newHistoryItem);
        
        if (state.searchHistory.length > 5) {
          state.searchHistory = state.searchHistory.slice(0, 5);
        }
        
        saveSearchHistory(state.searchHistory);
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isTransitioning = false;
        if (action.payload?.includes('Network error')) {
          state.retryCount++;
        }
      })
      .addCase(selectFromHistoryAsync.pending, (state) => {
        state.isTransitioning = true;
      })
      .addCase(selectFromHistoryAsync.fulfilled, (state, action) => {
        state.currentWeather = action.payload.data;
        state.searchedCity = action.payload.cityName;
        state.error = null;
        state.isTransitioning = false;
      })
      .addCase(selectFromHistoryAsync.rejected, (state) => {
        state.isTransitioning = false;
      });
  }
});

export const { clearError, setTransitioning } = weatherSlice.actions;
export default weatherSlice.reducer;


