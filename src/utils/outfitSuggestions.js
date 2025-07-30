export const getOutfitSuggestion = (temp, condition) => {
  let suggestions = [];
  
  if (temp < 0) {
    suggestions.push("Wear heavy winter coat and gloves");
    suggestions.push("Consider thermal underwear");
  } else if (temp < 10) {
    suggestions.push("Wear a warm jacket or coat");
    suggestions.push("Long pants recommended");
  } else if (temp < 20) {
    suggestions.push("Light jacket or sweater recommended");
    suggestions.push("Comfortable for jeans or long pants");
  } else if (temp < 30) {
    suggestions.push("T-shirt and light clothing");
    suggestions.push("Perfect weather for shorts");
  } else {
    suggestions.push("Light, breathable clothing");
    suggestions.push("Stay hydrated and seek shade");
  }

  if (condition === "rainy") {
    suggestions.push("Take an umbrella");
    suggestions.push("Wear waterproof shoes");
  } else if (condition === "sunny") {
    suggestions.push("Sunglasses suggested");
    suggestions.push("Apply sunscreen");
  } else if (condition === "cloudy") {
    suggestions.push("Light layers recommended");
  }

  return suggestions;
};