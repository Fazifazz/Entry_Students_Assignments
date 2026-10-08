import { useEffect, useState } from "react";
import axios from "axios";

import MovieCard from "./components/MovieCard";
import Watchlist from "./components/Watchlist";
import GenreFilter from "./components/GenreFilter";
import Footer from "./components/Footer";

import "./App.css";

function App() {

  const [movies, setMovies] = useState([]);

  const [watchlist, setWatchlist] = useState([]);

  const [selectedGenre, setSelectedGenre] = useState("All");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);


  useEffect(() => {

    async function fetchMovies() {

      try {

        const response = await axios.get("/movies.json");

        setMovies(response.data);

      } catch (err) {

        setError("Failed to load movies.");

      } finally {

        setLoading(false);

      }
    }

    fetchMovies();

  }, []);


  function handleAddToWatchlist(movie) {

    setWatchlist((prevWatchlist) => {

      const alreadyAdded = prevWatchlist.some(
        (item) => item.id === movie.id
      );

      if (alreadyAdded) {
        return prevWatchlist;
      }

      return [...prevWatchlist, movie];

    });
  }


  function handleRemoveFromWatchlist(movieId) {

    setWatchlist((prevWatchlist) =>
      prevWatchlist.filter(
        (movie) => movie.id !== movieId
      )
    );

  }


  const filteredMovies =
    selectedGenre === "All"
      ? movies
      : movies.filter(
          (movie) => movie.genre === selectedGenre
        );


  const genres = [
    "All",
    ...new Set(
      movies.map((movie) => movie.genre)
    )
  ];


  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading movies...</p>
      </div>
    );
  }


  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }


  return (
    <div className="app">

      <header className="header">

        <h1>🎬 Movie Watchlist</h1>

        <p>
          Discover movies and build your watchlist
        </p>

      </header>
    <section className="hero">
     <img
    src="/images/hero.png"
    alt="Discover a world of movies"
    className="hero-image"
     />
    </section>

      <main>

        <section className="movies-section">

          <h2>Movies</h2>


          <GenreFilter
            genres={genres}
            selectedGenre={selectedGenre}
            onGenreChange={setSelectedGenre}
          />


          {filteredMovies.length === 0 ? (

            <div className="no-movies">

              <h3>No movies found</h3>

              <p>
                Try selecting another genre.
              </p>

            </div>

          ) : (

            <div className="row g-4">

              {filteredMovies.map((movie) => (
                <div
                className="col-12 col-sm-6 col-lg-3"
                key={movie.id}
                >
                <MovieCard

                  id={movie.id}

                  title={movie.title}

                  genre={movie.genre}

                  year={movie.year}

                  rating={movie.rating}
                  description={movie.description}
                  image={movie.image}

                  onAdd={handleAddToWatchlist}

                  isAdded={watchlist.some(
                    (item) =>
                      item.id === movie.id
                  )}

                />
                </div>

              ))}

            </div>

          )}

        </section>


        <Watchlist
          watchlist={watchlist}
          onRemove={handleRemoveFromWatchlist}
        />

      </main>
      <Footer/>
    </div>
  );
}

export default App;