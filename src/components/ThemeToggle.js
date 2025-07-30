import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../store/themeSlice';
import './ThemeToggle.css';

function ThemeToggle() {
  const dispatch = useDispatch();
  const { isDarkMode } = useSelector(state => state.theme);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <button 
      className={`theme-toggle ${isDarkMode ? 'dark' : 'light'}`}
      onClick={handleToggle}
      aria-label="Toggle theme"
    >
      <span className="theme-icon">
        {isDarkMode ? '🌙' : '☀️'}
      </span>
    </button>
  );
}

export default ThemeToggle;