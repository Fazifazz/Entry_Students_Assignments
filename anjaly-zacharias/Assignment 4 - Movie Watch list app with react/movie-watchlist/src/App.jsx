import { useEffect, useState } from "react";
import axios from "axios";

import MovieCard from "./components/MovieCard";
import Watchlist from "./components/Watchlist";
import GenreFilter from "./components/GenreFilter";
import SearchBar from "./components/SearchBar";
import Loader from "./components/Loader";

import moviesData from "./data/movies";

function App() {
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState(() => {
    return JSON.parse(localStorage.getItem("watchlist")) || [];
  });

  const [genre, setGenre] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // FETCH MOVIES
  useEffect(() => {
    axios
      .get("/src/data/movies.js")
      .then(() => {
        setMovies(moviesData);
        setLoading(false);
      });
  }, []);

  // SAVE WATCHLIST
  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  // ADD
  const addToWatchlist = (movie) => {
    const exists = watchlist.find((m) => m.id === movie.id);
    if (!exists) {
      setWatchlist([...watchlist, movie]);
    }
  };

  // REMOVE
  const removeMovie = (id) => {
    setWatchlist(watchlist.filter((m) => m.id !== id));
  };

  // FILTER + SEARCH
  const filteredMovies = movies.filter((movie) => {
    const matchGenre = genre === "All" || movie.genre === genre;
    const matchSearch = movie.title.toLowerCase().includes(search.toLowerCase());
    return matchGenre && matchSearch;
  });

  return (
    <div className="app">
      <h1>🎬 Netflix Watchlist Pro</h1>

      <SearchBar setSearch={setSearch} />
      <GenreFilter setGenre={setGenre} />

      {loading ? (
        <Loader />
      ) : filteredMovies.length === 0 ? (
        <h3 className="center">No movies found 😢</h3>
      ) : (
        <div className="grid">
          {filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onAdd={addToWatchlist}
              isAdded={watchlist.some((m) => m.id === movie.id)}
            />
          ))}
        </div>
      )}

      <Watchlist list={watchlist} onRemove={removeMovie} />
    </div>
  );
}

export default App;