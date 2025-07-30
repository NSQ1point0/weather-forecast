import { useState } from 'react';
import './App.css';
import CitySearch from './components/CitySearch';
import mockWeatherData from './data/mockWeatherData.json';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchedCity, setSearchedCity] = useState('');

  const fetchWeatherData = async (cityName) => {
    setLoading(true);
    setError(null);
    setSearchedCity(cityName);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const cityKey = Object.keys(mockWeatherData.cities).find(
        key => key.toLowerCase() === cityName.toLowerCase()
      );
      
      if (cityKey) {
        setWeatherData(mockWeatherData.cities[cityKey]);
      } else {
        setError('City not found. Try: New York, London, Tokyo, Paris, Sydney, Mumbai, or Chennai');
        setWeatherData(null);
      }
    } catch (err) {
      setError('Failed to fetch weather data');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather Dashboard</h1>
        
        <CitySearch onSearch={fetchWeatherData} loading={loading} />

        {error && <div className="error">{error}</div>}

        {weatherData && (
          <div className="weather-card">
            <h2>{searchedCity}</h2>
            <div className="weather-info">
              <p><strong>Temperature:</strong> {weatherData.temp}°C</p>
              <p><strong>Condition:</strong> {weatherData.condition}</p>
              <p><strong>Wind Speed:</strong> {weatherData.wind_speed} m/s</p>
              <p><strong>Humidity:</strong> {weatherData.humidity}%</p>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;


