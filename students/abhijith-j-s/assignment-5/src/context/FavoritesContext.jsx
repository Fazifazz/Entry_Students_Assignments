import { createContext, useContext, useEffect, useState } from "react";
import { toSummary } from "../utils/recipe.js";

const STORAGE_KEY = "recipe-box-favourites";
const FavoritesContext = createContext(null);

// Read saved favourites safely: bad or missing data gives an empty list.
function loadFavourites() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

export function FavoritesProvider({ children }) {
  const [favourites, setFavourites] = useState(loadFavourites);

  // Save every change.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
    } catch {
      /* storage full or blocked: the app still works for this session */
    }
  }, [favourites]);

  const isFavourite = (id) => favourites.some((item) => item.idMeal === id);

  const addFavourite = (meal) => {
    setFavourites((current) =>
      current.some((item) => item.idMeal === meal.idMeal) ? current : [...current, toSummary(meal)]
    );
  };

  const removeFavourite = (id) => {
    setFavourites((current) => current.filter((item) => item.idMeal !== id));
  };

  const toggleFavourite = (meal) => {
    if (isFavourite(meal.idMeal)) removeFavourite(meal.idMeal);
    else addFavourite(meal);
  };

  return (
    <FavoritesContext.Provider
      value={{ favourites, isFavourite, addFavourite, removeFavourite, toggleFavourite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("useFavorites must be used inside FavoritesProvider");
  return context;
}
