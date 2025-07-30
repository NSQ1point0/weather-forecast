import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import mockWeatherData from '../data/mockWeatherData.json';

export const fetchWeatherData = createAsyncThunk(
  'weather/fetchWeatherData',
  async (cityName, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const cityKey = Object.keys(mockWeatherData.cities).find(
        key => key.toLowerCase() === cityName.toLowerCase()
      );
      
      if (cityKey) {
        return {
          cityName: cityKey,
          data: mockWeatherData.cities[cityKey]
        };
      } else {
        return rejectWithValue('City not found. Try: New York, London, Tokyo, Paris, Sydney, Mumbai, or Chennai');
      }
    } catch (error) {
      return rejectWithValue('Failed to fetch weather data');
    }
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    currentWeather: null,
    searchHistory: [],
    loading: false,
    error: null,
    searchedCity: ''
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.loading = false;
        state.currentWeather = action.payload.data;
        state.searchedCity = action.payload.cityName;
        
        const existingIndex = state.searchHistory.findIndex(
          item => item.cityName.toLowerCase() === action.payload.cityName.toLowerCase()
        );
        
        if (existingIndex !== -1) {
          state.searchHistory.splice(existingIndex, 1);
        }
        
        state.searchHistory.unshift({
          cityName: action.payload.cityName,
          data: action.payload.data,
          timestamp: Date.now()
        });
        
        if (state.searchHistory.length > 5) {
          state.searchHistory = state.searchHistory.slice(0, 5);
        }
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.currentWeather = null;
      });
  }
});

export const { clearError } = weatherSlice.actions;
export default weatherSlice.reducer;