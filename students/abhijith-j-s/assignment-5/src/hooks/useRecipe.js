import { useState, useEffect } from "react";
import axios from "axios";

const LOOKUP_URL = "https://www.themealdb.com/api/json/v1/1/lookup.php";

// Fetch one full recipe by id.
export default function useRecipe(id) {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);
    setRecipe(null);

    axios
      .get(LOOKUP_URL, { params: { i: id }, signal: controller.signal })
      .then((response) => {
        const meal = response.data?.meals?.[0] ?? null;
        if (!meal) setError("We couldn't find that recipe.");
        setRecipe(meal);
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        setError("We couldn't load this recipe. Check your connection and try again.");
        setLoading(false);
      });

    return () => controller.abort();
  }, [id]);

  return { recipe, loading, error };
}
