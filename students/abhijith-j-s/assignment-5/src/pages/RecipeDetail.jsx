import { useParams, Link } from "react-router-dom";
import useRecipe from "../hooks/useRecipe.js";
import { useFavorites } from "../context/FavoritesContext.jsx";
import { getIngredients } from "../utils/recipe.js";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

export default function RecipeDetail() {
  const { id } = useParams(); // the :id from /recipes/:id
  const { recipe, loading, error } = useRecipe(id);
  const { isFavourite, toggleFavourite } = useFavorites();

  if (loading) return <LoadingSpinner label="Loading recipe..." />;

  if (error || !recipe) {
    return (
      <>
        <ErrorMessage message={error || "We couldn't find that recipe."} />
        <p className="center"><Link to="/recipes" className="btn btn-outline">Back to Recipes</Link></p>
      </>
    );
  }

  const ingredients = getIngredients(recipe);
  const saved = isFavourite(recipe.idMeal);
  const steps = (recipe.strInstructions || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <article className="detail">
      <Link to="/recipes" className="text-link">&larr; Back to Recipes</Link>

      <div className="detail-top">
        <img src={recipe.strMealThumb} alt={recipe.strMeal} className="detail-image" />
        <div>
          <h1>{recipe.strMeal}</h1>
          <ul className="tags">
            {recipe.strCategory && <li>Category: {recipe.strCategory}</li>}
            {recipe.strArea && <li>Cuisine: {recipe.strArea}</li>}
          </ul>
          <button
            type="button"
            className={`btn ${saved ? "btn-danger" : "btn-primary"}`}
            onClick={() => toggleFavourite(recipe)}
            aria-pressed={saved}
          >
            {saved ? "Remove from Favourites" : "Save to Favourites"}
          </button>
        </div>
      </div>

      <div className="detail-columns">
        <section aria-labelledby="ingredients-heading" className="panel">
          <h2 id="ingredients-heading">Ingredients</h2>
          {ingredients.length === 0 ? (
            <p>No ingredient list is available.</p>
          ) : (
            <ul className="ingredients">
              {ingredients.map((item, index) => (
                <li key={`${item.name}-${index}`}>
                  <span>{item.name}</span>
                  <span className="measure">{item.measure}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section aria-labelledby="instructions-heading" className="panel">
          <h2 id="instructions-heading">Instructions</h2>
          {steps.length === 0 ? (
            <p>No instructions are available.</p>
          ) : (
            steps.map((step, index) => <p key={index}>{step}</p>)
          )}
        </section>
      </div>
    </article>
  );
}
