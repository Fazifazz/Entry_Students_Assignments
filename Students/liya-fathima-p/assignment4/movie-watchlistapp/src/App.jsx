import { useEffect, useState } from "react";
import axios from "axios";

import MovieCard from "./components/MovieCard";
import Watchlist from "./components/Watchlist";

import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [genre, setGenre] = useState("All");
  const [loading, setLoading] = useState(true);

  // Fetch movies
  useEffect(() => {
    axios
      .get("/movies.json")
      .then((response) => {
        setMovies(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  // Add movie
  const addToWatchlist = (movie) => {
    const alreadyAdded = watchlist.some(
      (item) => item.id === movie.id
    );

    if (!alreadyAdded) {
      setWatchlist([...watchlist, movie]);
    }
  };

  // Remove movie
  const removeFromWatchlist = (id) => {
    setWatchlist(
      watchlist.filter((movie) => movie.id !== id)
    );
  };

  // Filter movies
  const filteredMovies =
    genre === "All"
      ? movies
      : movies.filter((movie) => movie.genre === genre);

  return (
    <div className="app">

      <h1>🎬 Movie Watchlist</h1>

      {/* Genre Filter */}
      <div className="filters">
        <button onClick={() => setGenre("All")}>All</button>
        <button onClick={() => setGenre("Action")}>Action</button>
        <button onClick={() => setGenre("Comedy")}>Comedy</button>
        <button onClick={() => setGenre("Drama")}>Drama</button>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="loading">
          Loading movies...
        </div>
      ) : (
        <>
          <div className="movie-container">

            {filteredMovies.length === 0 ? (
              <p>No movies found.</p>
            ) : (
              filteredMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  title={movie.title}
                  genre={movie.genre}
                  year={movie.year}
                  rating={movie.rating}
                  onAdd={() => addToWatchlist(movie)}
                  isAdded={watchlist.some(
                    (item) => item.id === movie.id
                  )}
                />
              ))
            )}

          </div>

          <Watchlist
            watchlist={watchlist}
            onRemove={removeFromWatchlist}
          />
        </>
      )}

    </div>
  );
}

export default App;