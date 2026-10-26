import { Link } from "react-router-dom";
import useRecipes from "../hooks/useRecipes.js";
import RecipeCard from "../components/RecipeCard.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

const SUGGESTIONS = ["Chicken", "Pasta", "Beef", "Cake", "Soup", "Curry"];

export default function Home() {
  // Real API data for the "popular" section: no hardcoded recipes.
  const { data, loading, error } = useRecipes("chicken");
  const featured = data.slice(0, 4);

  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <h1>Discover Delicious Recipes</h1>
          <p>
            Search thousands of meals, read the full ingredient list and method,
            and keep the ones you love in one place.
          </p>
          <Link to="/recipes" className="btn btn-accent btn-large">Search Recipes</Link>
          <div className="chips" aria-label="Popular searches">
            {SUGGESTIONS.map((term) => (
              <Link key={term} to={`/recipes?q=${term}`} className="chip">{term}</Link>
            ))}
          </div>
        </div>
        <div className="hero-images" aria-hidden="true">
          {featured.slice(0, 3).map((meal, index) => (
            <img key={meal.idMeal} src={`${meal.strMealThumb}/preview`} alt="" className={`hero-img hero-img-${index + 1}`} />
          ))}
        </div>
      </section>

      <section aria-labelledby="popular-heading">
        <div className="section-header">
          <h2 id="popular-heading">Popular right now</h2>
          <Link to="/recipes" className="text-link">Browse all recipes</Link>
        </div>
        {loading && <LoadingSpinner label="Loading popular recipes..." />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && (
          <div className="grid">
            {featured.map((meal) => <RecipeCard key={meal.idMeal} meal={meal} />)}
          </div>
        )}
      </section>
    </>
  );
}
