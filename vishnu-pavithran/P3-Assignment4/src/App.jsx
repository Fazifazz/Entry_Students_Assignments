import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import MovieCard from "./MovieCard";
import WatchList from "./watchList";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setIsLoading(true);

        const response = await axios.get("src/data/movies.json");

        setMovies(response.data);
        setFilteredMovies(response.data);
      } catch (error) {
        setError("Failed to load movies.");
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovies();
  }, []);

  const [watchlist, setWatchlist] = useState([]);

  function handleWatchlist(movie) {
    setWatchlist((currentWatchlist) => [...currentWatchlist, movie]);
  }

  function handleRemoveWatchlist(movie) {
    setWatchlist((currentWatchlist) =>
      currentWatchlist.filter((item) => item.id !== movie.id),
    );
  }

  function handleAllMovies() {
    setFilteredMovies(movies);
  }
  function handleActionMovies() {
    const actionMovies = movies.filter((movie) => movie.genre == "Action");
    setFilteredMovies(actionMovies);
  }
  function handleDramaMovies() {
    const dramaMovies = movies.filter((movie) => movie.genre == "Drama");
    setFilteredMovies(dramaMovies);
  }
  function handleComedyMovies() {
    const dramaMovies = movies.filter((movie) => movie.genre == "Comedy");
    setFilteredMovies(dramaMovies);
  }

  function handleFantacyMovies() {
    const fantacyMovies = movies.filter((movie) => movie.genre == "Fantasy");
    setFilteredMovies(fantacyMovies);
  }

  function handleAdventureMovies() {
    const adventureMovies = movies.filter(
      (movie) => movie.genre == "Adventure",
    );
    setFilteredMovies(adventureMovies);
  }
  function handleScienceFictionMovies() {
    const scienceFictionMovies = movies.filter(
      (movie) => movie.genre == "Science Fiction",
    );
    setFilteredMovies(scienceFictionMovies);
  }
  return (
    <>
      <div className="movie-container">
        <div className="movie-left">
          <div className="ml-header">
            <h1>Movies List</h1>
            <div className="movie-filter">
              <button onClick={handleAllMovies}>All</button>
              <button onClick={handleActionMovies}>Action Movies</button>
              <button onClick={handleDramaMovies}>Drama</button>
              <button onClick={handleComedyMovies}>Comedy</button>
              <button onClick={handleFantacyMovies}>Fantacy</button>
              <button onClick={handleAdventureMovies}>Adventure</button>
              <button onClick={handleScienceFictionMovies}>
                Science fiction
              </button>
            </div>
          </div>

          {isLoading && (
            <div className="loading">
              <div className="spinner"></div>
              <p>Loading movies...</p>
            </div>
          )}
          {error && <p className="error">{error}</p>}

          {!isLoading && !error && (
            <div className="all-movie-wrap">
              {filteredMovies.length === 0 ? (
                <p className="no-movies">No movies found.</p>
              ) : (
                filteredMovies.map((movie) => {
                  const isInWatchlist = watchlist.some(
                    (item) => item.id === movie.id,
                  );

                  return (
                    <MovieCard
                      key={movie.id}
                      title={movie.title}
                      genre={movie.genre}
                      year={movie.year}
                      rating={movie.rating}
                      poster={movie.poster}
                      addToWatchlist={() => handleWatchlist(movie)}
                      isInWatchlist={isInWatchlist}
                    />
                  );
                })
              )}
            </div>
          )}
        </div>
        <div className="movie-right">
          <h1>Watch List</h1>
          <div className="watchlist-wrap">
            {watchlist.map((movie) => (
              <WatchList
                key={movie.id}
                title={movie.title}
                genre={movie.genre}
                year={movie.year}
                rating={movie.rating}
                poster={movie.poster}
                removeFromWatchlist={() => handleRemoveWatchlist(movie)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
