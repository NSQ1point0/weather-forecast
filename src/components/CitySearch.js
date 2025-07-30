import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import './CitySearch.css';

const CITY_SUGGESTIONS = [
  'New York', 'London', 'Tokyo', 'Paris', 'Sydney', 'Mumbai', 'Chennai',
  'Berlin', 'Madrid', 'Rome', 'Amsterdam', 'Vienna', 'Prague', 'Budapest',
  'Warsaw', 'Stockholm', 'Oslo', 'Copenhagen', 'Helsinki', 'Dublin',
  'Barcelona', 'Milan', 'Venice', 'Florence', 'Naples', 'Lisbon', 'Porto',
  'Athens', 'Istanbul', 'Moscow', 'St. Petersburg', 'Kiev', 'Minsk',
  'Riga', 'Tallinn', 'Vilnius', 'Zurich', 'Geneva', 'Brussels', 'Luxembourg'
];

function CitySearch({ onSearch, loading }) {
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const { searchedCity } = useSelector(state => state.weather);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);
  const lastSearchedCityRef = useRef('');

  // Update input when city is selected from history
  useEffect(() => {
    // Use a timeout to check focus state after React updates
    const timer = setTimeout(() => {
      if (searchedCity && searchedCity !== lastSearchedCityRef.current && !document.activeElement?.classList.contains('city-input')) {
        setCity(searchedCity);
        setShowSuggestions(false);
        lastSearchedCityRef.current = searchedCity;
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [searchedCity]);

  // Debounced search suggestions - only show when input is focused
  useEffect(() => {
    const timer = setTimeout(() => {
      if (city.length > 0 && isInputFocused) {
        const filtered = CITY_SUGGESTIONS.filter(suggestion =>
          suggestion.toLowerCase().includes(city.toLowerCase())
        ).slice(0, 5);
        setSuggestions(filtered);
        setShowSuggestions(filtered.length > 0);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [city, isInputFocused]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      lastSearchedCityRef.current = city.trim();
      onSearch(city.trim());
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
    setSelectedIndex(-1);
  };

  const handleSuggestionClick = (suggestion) => {
    setCity(suggestion);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    setIsInputFocused(false); // Important: set focus to false
    lastSearchedCityRef.current = suggestion;
    onSearch(suggestion);
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSuggestionClick(suggestions[selectedIndex]);
        } else {
          handleSubmit(e);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
      default:
        // No action needed for other keys
        break;
    }
  };

  const handleFocus = () => {
    setIsInputFocused(true);
    // Immediately show suggestions if there's text
    if (city.length > 0) {
      const filtered = CITY_SUGGESTIONS.filter(suggestion =>
        suggestion.toLowerCase().includes(city.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    }
  };

  const handleBlur = (e) => {
    // Don't immediately set focus to false, let suggestion click handle it
    setTimeout(() => {
      if (!suggestionsRef.current?.contains(document.activeElement)) {
        setIsInputFocused(false);
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    }, 150);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="input-container">
          <input
            ref={inputRef}
            type="text"
            value={city}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            onFocus={handleFocus}
            placeholder="Enter city name..."
            className="city-input"
            autoComplete="off"
          />
          {showSuggestions && isInputFocused && (
            <div ref={suggestionsRef} className="suggestions-dropdown">
              {suggestions.map((suggestion, index) => (
                <div
                  key={suggestion}
                  className={`suggestion-item ${index === selectedIndex ? 'selected' : ''}`}
                  onClick={() => handleSuggestionClick(suggestion)}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
        <button type="submit" disabled={loading} className="search-button">
          {loading ? (
            <span className="loading-spinner">⟳</span>
          ) : (
            'Get Weather'
          )}
        </button>
      </form>
    </div>
  );
}

export default CitySearch;














