# Weather Dashboard

A modern, responsive weather dashboard built with React that allows users to search for weather information by city name and receive personalized outfit suggestions based on current weather conditions.

## Features

### 🌤️ Weather Information
- **City Search**: Enter any city name to get current weather data
- **Comprehensive Weather Data**: View temperature, weather condition, wind speed, and humidity
- **Visual Weather Icons**: Intuitive weather condition indicators (☀️ sunny, 🌧️ rainy, ☁️ cloudy)
- **Real-time Updates**: Fresh weather data with smooth loading animations

### 👔 Smart Outfit Suggestions
- **Temperature-based Recommendations**: Personalized clothing suggestions based on current temperature
- **Weather-aware Advice**: Additional recommendations considering weather conditions (rain, sun, etc.)
- **Animated Suggestions**: Smooth reveal animations for better user experience

### 🎨 User Experience
- **Dark/Light Theme Toggle**: Switch between modern dark and light themes
- **Search History**: Quick access to your 5 most recent searches with one-click selection
- **Autocomplete Search**: Smart city suggestions with keyboard navigation support
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Loading States**: Elegant loading animations and transitions
- **Error Handling**: Comprehensive error management with retry functionality

### 🔧 Technical Features
- **Redux State Management**: Centralized state management for weather data and UI state
- **Local Storage**: Persistent search history across browser sessions
- **Network Resilience**: Automatic retry mechanism for failed requests (up to 3 attempts)
- **Smooth Transitions**: CSS animations and transitions throughout the interface
- **Accessibility**: Keyboard navigation support for search suggestions

## Getting Started

### Prerequisites

Make sure you have Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd weather-forcast
```

2. Install dependencies:
```bash
npm install
```

### Running the App

To start the development server:

```bash
npm start
```

The app will open in your browser at [http://localhost:3000](http://localhost:3000).

### Other Available Scripts

- `npm test` - Run the test suite
- `npm run build` - Build the app for production
- `npm run eject` - Eject from Create React App (one-way operation)

## Development Assumptions & Decisions

### Architecture Decisions
- **Create React App**: Chosen for rapid development setup and built-in tooling
- **Redux Toolkit**: Selected for predictable state management and excellent DevTools integration
- **Component-based Architecture**: Modular design with reusable components for maintainability

### Data & API Decisions
- **Mock Data Implementation**: Used local JSON data instead of external weather API to avoid API key management and rate limiting during development
- **Simulated Network Conditions**: Added artificial delays and occasional failures to simulate real-world network conditions
- **Limited City Database**: Focused on major world cities for demonstration purposes

### User Experience Decisions
- **Search History Limit**: Capped at 5 recent searches to maintain clean UI and optimal performance
- **Autocomplete Behavior**: 
  - Shows suggestions only when input is focused to reduce visual clutter
  - Hides suggestions when selecting from recent searches to avoid confusion
  - Implements keyboard navigation (arrow keys, enter, escape) for accessibility
- **Theme Persistence**: Theme preference is stored in Redux state (could be extended to localStorage)

### Error Handling Strategy
- **Network Resilience**: Automatic retry mechanism with exponential backoff for network failures
- **User-friendly Messages**: Clear, actionable error messages instead of technical jargon
- **Graceful Degradation**: App remains functional even when some features fail

### Performance Considerations
- **Debounced Search**: 300ms delay on autocomplete to reduce unnecessary filtering
- **Optimized Animations**: CSS-based animations for better performance than JavaScript animations
- **Efficient Re-renders**: Proper Redux selectors to minimize unnecessary component updates

### Styling Approach
- **CSS-in-CSS**: Traditional CSS files for better maintainability and easier theming
- **Custom Color Scheme**: 
  - Light theme: Warm, welcoming colors (#FDFAF6 background, #FEBA17 highlights, #FAF1E6 cards)
  - Dark theme: Modern, professional colors (#393E46 background, #0F828C highlights, #222831 cards)
- **Mobile-first Responsive**: Designed for mobile devices first, then enhanced for desktop

### Code Organization
- **Feature-based Structure**: Components, utilities, and store organized by functionality
- **Separation of Concerns**: Business logic separated from presentation components
- **Reusable Utilities**: Outfit suggestion logic extracted to utility functions for testability

## Project Status

✅ **Complete** - Core functionality implemented with the following features:
- City weather search with autocomplete
- Weather data display with outfit suggestions
- Search history with quick selection
- Dark/light theme toggle
- Responsive design
- Error handling and retry logic
- Smooth animations and transitions

## Technologies Used

- **Frontend Framework**: React 19.1.1
- **State Management**: Redux Toolkit 2.0.1 with React Redux 9.0.4
- **Build Tool**: Create React App 5.0.1
- **Styling**: CSS3 with custom properties and animations
- **Testing**: Jest and React Testing Library
- **Development**: JavaScript ES6+ with modern React patterns

## Future Enhancements

- Integration with real weather API (OpenWeatherMap, WeatherAPI, etc.)
- Extended city database with geolocation support
- Weather forecasts (5-day, hourly)
- More detailed outfit suggestions based on additional factors
- User preferences and customization options
- Progressive Web App (PWA) capabilities
- Unit and integration test coverage

---

*This weather dashboard demonstrates modern React development practices with a focus on user experience, performance, and maintainable code architecture.*


