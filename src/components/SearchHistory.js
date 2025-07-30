import { useSelector, useDispatch } from 'react-redux';
import { selectFromHistoryAsync } from '../store/weatherSlice';

function SearchHistory() {
  const dispatch = useDispatch();
  const { searchHistory } = useSelector(state => state.weather);

  const handleHistoryClick = (cityName) => {
    dispatch(selectFromHistoryAsync(cityName));
  };

  if (searchHistory.length === 0) {
    return null;
  }

  return (
    <div className="search-history">
      <h3>📍 Recent Searches</h3>
      <div className="history-list">
        {searchHistory.map((item, index) => (
          <button
            key={index}
            className="history-item"
            onClick={() => handleHistoryClick(item.cityName)}
          >
            {item.cityName}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SearchHistory;


