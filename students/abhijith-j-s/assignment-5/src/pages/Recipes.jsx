import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import useRecipes from "../hooks/useRecipes.js";
import RecipeCard from "../components/RecipeCard.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

export default function Recipes() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [input, setInput] = useState(initialQuery); // controlled input
  const [query, setQuery] = useState(initialQuery); // submitted query sent to the hook

  const { data, loading, error } = useRecipes(query);

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return; // prevent requests for an empty field
    setQuery(trimmed);
    setSearchParams({ q: trimmed });
  };

  // Clear the query, then restore it, so the hook runs the same search again.
  const handleRetry = () => {
    const current = query;
    setQuery("");
    setTimeout(() => setQuery(current), 0);
  };

  const hasSearched = query.trim() !== "";

  return (
    <section>
      <h1 className="page-title">Find a recipe</h1>

      <form className="search-form" onSubmit={handleSubmit} role="search">
        <label htmlFor="recipe-search" className="visually-hidden">Recipe name</label>
        <input
          id="recipe-search"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Try pasta, chicken or cake"
          autoComplete="off"
        />
        <button type="submit" className="btn btn-primary" disabled={!input.trim()}>
          Search
        </button>
      </form>

      <div aria-live="polite">
        {!hasSearched && (
          <div className="state">
            <h2>What are you hungry for?</h2>
            <p>Type a dish or ingredient above to see matching recipes.</p>
          </div>
        )}

        {loading && <LoadingSpinner label={`Searching for "${query}"...`} />}

        {error && <ErrorMessage message={error} onRetry={handleRetry} />}

        {hasSearched && !loading && !error && data.length === 0 && (
          <div className="state">
            <h2>No recipes found</h2>
            <p>Nothing matched "{query}". Check the spelling or try a simpler word like "chicken".</p>
          </div>
        )}

        {data.length > 0 && (
          <>
            <p className="result-count">{data.length} {data.length === 1 ? "recipe" : "recipes"} for "{query}"</p>
            <div className="grid">
              {data.map((meal) => <RecipeCard key={meal.idMeal} meal={meal} />)}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
