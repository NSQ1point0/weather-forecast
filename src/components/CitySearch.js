import { useState } from 'react';
import './CitySearch.css';

function CitySearch({ onSearch, loading }) {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name..."
        className="city-input"
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Loading...' : 'Get Weather'}
      </button>
    </form>
  );
}

export default CitySearch;