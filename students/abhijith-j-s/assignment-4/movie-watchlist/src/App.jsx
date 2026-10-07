import { useState, useEffect } from "react";
import axios from "axios";
import moviesUrl from "./data/movies.json?url";
import MovieCard from "./components/MovieCard";
import Watchlist from "./components/Watchlist";
import GenreFilter from "./components/GenreFilter";
import "./App.css";

const GENRES = ["All", "Action", "Comedy", "Drama", "Thriller", "Romance"];

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    let isCancelled = false;

    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(moviesUrl);
        // Small delay so the loading state is visible with local data
        await new Promise((resolve) => setTimeout(resolve, 800));
        if (!isCancelled) setMovies(response.data);
      } catch (err) {
        if (!isCancelled) {
          setError("Failed to load movies. Please try again later.");
        }
      } finally {
        if (!isCancelled) setLoading(false);
      }
    };

    fetchMovies();
    return () => {
      isCancelled = true;
    };
  }, []);

  const handleAddToWatchlist = (movie) => {
    setWatchlist((prev) =>
      prev.some((item) => item.id === movie.id) ? prev : [...prev, movie]
    );
  };

  const handleRemoveFromWatchlist = (movieId) => {
    setWatchlist((prev) => prev.filter((item) => item.id !== movieId));
  };

  const filteredMovies =
    selectedGenre === "All"
      ? movies
      : movies.filter((movie) => movie.genre === selectedGenre);

  const isInWatchlist = (movieId) =>
    watchlist.some((item) => item.id === movieId);

  const renderMovies = () => {
    if (loading) {
      return (
        <div className="state-box">
          <div className="spinner" />
          <p>Loading movies...</p>
        </div>
      );
    }
    if (error) {
      return <div className="state-box state-box--error">{error}</div>;
    }
    if (filteredMovies.length === 0) {
      return <div className="state-box">No movies found</div>;
    }
    return (
      <div className="movie-grid">
        {filteredMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            genre={movie.genre}
            year={movie.year}
            rating={movie.rating}
            isAdded={isInWatchlist(movie.id)}
            onAdd={() => handleAddToWatchlist(movie)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="app">
      <header className="header">
        <h1>🎬 Movie Watchlist</h1>
      </header>

      <main className="layout">
        <section className="movies-section">
          <GenreFilter
            genres={GENRES}
            selectedGenre={selectedGenre}
            onSelectGenre={setSelectedGenre}
          />
          {renderMovies()}
        </section>

        <Watchlist
          watchlist={watchlist}
          onRemove={handleRemoveFromWatchlist}
        />
      </main>
    </div>
  );
}

export default App;