import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext.jsx";
import RecipeCard from "../components/RecipeCard.jsx";

export default function Favourites() {
  const { favourites } = useFavorites();

  return (
    <section>
      <h1 className="page-title">Your favourites</h1>

      {favourites.length === 0 ? (
        <div className="state">
          <h2>No favourites yet</h2>
          <p>Press "Save to Favourites" on any recipe and it will show up here.</p>
          <Link to="/recipes" className="btn btn-primary">Find recipes</Link>
        </div>
      ) : (
        <div className="grid">
          {favourites.map((meal) => <RecipeCard key={meal.idMeal} meal={meal} />)}
        </div>
      )}
    </section>
  );
}
