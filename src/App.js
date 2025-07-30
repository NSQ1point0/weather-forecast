import { useSelector, useDispatch } from 'react-redux';
import { fetchWeatherData } from './store/weatherSlice';
import './App.css';
import CitySearch from './components/CitySearch';

function App() {
  const dispatch = useDispatch();
  const { currentWeather, loading, error, searchedCity } = useSelector(state => state.weather);

  const handleSearch = (cityName) => {
    dispatch(fetchWeatherData(cityName));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather Dashboard</h1>
        
        <CitySearch onSearch={handleSearch} loading={loading} />

        {error && <div className="error">{error}</div>}

        {currentWeather && (
          <div className="weather-card">
            <h2>{searchedCity}</h2>
            <div className="weather-info">
              <p><strong>Temperature:</strong> {currentWeather.temp}°C</p>
              <p><strong>Condition:</strong> {currentWeather.condition}</p>
              <p><strong>Wind Speed:</strong> {currentWeather.wind_speed} m/s</p>
              <p><strong>Humidity:</strong> {currentWeather.humidity}%</p>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;

