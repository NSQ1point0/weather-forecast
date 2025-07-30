import { useSelector, useDispatch } from 'react-redux';
import { fetchWeatherData, clearError } from './store/weatherSlice';
import { getOutfitSuggestion } from './utils/outfitSuggestions';
import './App.css';
import CitySearch from './components/CitySearch';
import ThemeToggle from './components/ThemeToggle';
import SearchHistory from './components/SearchHistory';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const dispatch = useDispatch();
  const { currentWeather, loading, error, searchedCity, retryCount, isTransitioning } = useSelector(state => state.weather);
  const { isDarkMode } = useSelector(state => state.theme);

  const handleSearch = (cityName) => {
    dispatch(fetchWeatherData(cityName));
  };

  const handleRetry = () => {
    if (searchedCity) {
      dispatch(fetchWeatherData(searchedCity));
    }
  };

  const handleDismissError = () => {
    dispatch(clearError());
  };

  const outfitSuggestions = currentWeather 
    ? getOutfitSuggestion(currentWeather.temp, currentWeather.condition)
    : [];

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'sunny':
        return '☀️';
      case 'rainy':
        return '🌧️';
      case 'cloudy':
        return '☁️';
      default:
        return '🌤️';
    }
  };

  return (
    <ErrorBoundary>
      <div className={`App ${isDarkMode ? 'dark' : 'light'}`}>
        <ThemeToggle />
        <header className="App-header">
          <h1>Weather Dashboard</h1>
          
          <CitySearch onSearch={handleSearch} loading={loading} />
          
          <SearchHistory />

          {error && (
            <div className="error-container">
              <div className="error">
                <div className="error-content">
                  <span className="error-icon">⚠️</span>
                  <span className="error-message">{error}</span>
                </div>
                <div className="error-actions">
                  {error.includes('Network error') && (
                    <button 
                      className="retry-button" 
                      onClick={handleRetry}
                      disabled={loading}
                    >
                      {loading ? 'Retrying...' : `Retry (${retryCount}/3)`}
                    </button>
                  )}
                  <button className="dismiss-button" onClick={handleDismissError}>
                    ✕
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentWeather && (
            <div className={`weather-card ${isTransitioning ? 'transitioning' : ''}`}>
              <div className="weather-header">
                <div className="weather-icon">
                  {getWeatherIcon(currentWeather.condition)}
                </div>
                <h2>{searchedCity}</h2>
              </div>
              
              <div className="weather-info">
                <div className="weather-info-item">
                  <div className="label">Temperature</div>
                  <div className="value">{currentWeather.temp}°C</div>
                </div>
                <div className="weather-info-item">
                  <div className="label">Condition</div>
                  <div className="value">{currentWeather.condition}</div>
                </div>
                <div className="weather-info-item">
                  <div className="label">Wind Speed</div>
                  <div className="value">{currentWeather.wind_speed} m/s</div>
                </div>
                <div className="weather-info-item">
                  <div className="label">Humidity</div>
                  <div className="value">{currentWeather.humidity}%</div>
                </div>
              </div>
              
              {outfitSuggestions.length > 0 && (
                <div className="outfit-suggestions">
                  <h3>👔 Outfit Suggestions</h3>
                  <ul>
                    {outfitSuggestions.map((suggestion, index) => (
                      <li key={index} style={{ animationDelay: `${index * 0.1}s` }}>
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {loading && !currentWeather && (
            <div className="loading-card">
              <div className="loading-spinner-large">⟳</div>
              <p>Fetching weather data...</p>
            </div>
          )}
        </header>
      </div>
    </ErrorBoundary>
  );
}

export default App;







