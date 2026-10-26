import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext.jsx";

export default function RecipeCard({ meal }) {
  const { isFavourite, toggleFavourite } = useFavorites();
  const saved = isFavourite(meal.idMeal);
  const details = [meal.strCategory, meal.strArea].filter(Boolean).join(", ");

  return (
    <article className="card">
      <Link to={`/recipes/${meal.idMeal}`} tabIndex={-1} aria-hidden="true">
        <img
          src={`${meal.strMealThumb}/preview`}
          alt=""
          loading="lazy"
          className="card-image"
          onError={(e) => { e.currentTarget.src = meal.strMealThumb; }}
        />
      </Link>
      <div className="card-body">
        <h3 className="card-title">{meal.strMeal}</h3>
        {details && <p className="card-meta">{details}</p>}
        <div className="card-actions">
          <Link to={`/recipes/${meal.idMeal}`} className="btn btn-primary">
            View Recipe
          </Link>
          <button
            type="button"
            className={`btn ${saved ? "btn-danger" : "btn-outline"}`}
            onClick={() => toggleFavourite(meal)}
            aria-pressed={saved}
          >
            {saved ? "Remove from Favourites" : "Save to Favourites"}
          </button>
        </div>
      </div>
    </article>
  );
}
