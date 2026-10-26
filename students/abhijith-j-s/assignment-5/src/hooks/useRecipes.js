import { useState, useEffect } from "react";
import axios from "axios";

const SEARCH_URL = "https://www.themealdb.com/api/json/v1/1/search.php";

export default function useRecipes(query) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const trimmed = (query || "").trim();

    // Empty query: no request, clear everything.
    if (!trimmed) {
      setData([]);
      setLoading(false);
      setError(null);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError(null); // reset the previous error
    setData([]); // avoid showing stale results

    axios
      .get(SEARCH_URL, { params: { s: trimmed }, signal: controller.signal })
      .then((response) => {
        // TheMealDB returns { meals: null } when nothing matches.
        setData(response.data?.meals ?? []);
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return; // a newer search replaced this one
        setError("We couldn't load recipes. Check your connection and try again.");
        setLoading(false);
      });

    // Cancel the in-flight request if the query changes or the component unmounts.
    return () => controller.abort();
  }, [query]);

  return { data, loading, error };
}
