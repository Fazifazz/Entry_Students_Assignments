import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from './components/MovieCard.jsx';
import Watchlist from './components/Watchlist.jsx';

function App() {
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get('/movies.json')
      .then((response) => setMovies(response.data))
      .catch(() => setError('The movie collection could not be loaded. Please try again.'))
      .finally(() => setIsLoading(false));
  }, []);

  const genres = ['All', ...new Set(movies.map((movie) => movie.genre))];
  const filteredMovies = movies.filter(
    (movie) => selectedGenre === 'All' || movie.genre === selectedGenre,
  );

  function addToWatchlist(movie) {
    setWatchlist((currentWatchlist) => {
      if (currentWatchlist.some((item) => item.id === movie.id)) {
        return currentWatchlist;
      }

      return [...currentWatchlist, movie];
    });
  }

  function removeFromWatchlist(movieId) {
    setWatchlist((currentWatchlist) =>
      currentWatchlist.filter((movie) => movie.id !== movieId),
    );
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Reel Shelf home">
          <span className="brand-mark" aria-hidden="true">R</span>
          <span>REEL<span className="brand-light">SHELF</span></span>
        </a>
        <div className="topbar-note"><span className="status-dot" /> YOUR PERSONAL FILM LOG</div>
        <a className="watchlist-jump" href="#watchlist">
          Watchlist <span className="jump-count">{watchlist.length}</span>
        </a>
      </header>

      <main id="top" className="page-content">
        <section className="intro" aria-labelledby="page-title">
          <div className="intro-copy">
            <p className="eyebrow">THE DOUBLE FEATURE</p>
            <h1 id="page-title">A good film<br />is worth <em>keeping.</em></h1>
            <p className="intro-description">Browse the collection. Save what catches your eye.</p>
          </div>
          <div className="intro-art" aria-hidden="true">
            <div className="film-frame frame-back" />
            <div className="film-frame frame-front"><span>TONIGHT<br />IS A<br /><b>MOVIE<br />NIGHT</b></span></div>
            <span className="spark spark-one">✳</span>
            <span className="spark spark-two">✳</span>
          </div>
        </section>

        <div className="content-grid">
          <section className="library" aria-labelledby="library-title">
            <div className="section-heading">
              <div>
                <p className="eyebrow">PICK YOUR NEXT WATCH</p>
                <h2 id="library-title">The collection <span className="heading-count">{movies.length.toString().padStart(2, '0')}</span></h2>
              </div>
            </div>

            <div className="genre-filter" aria-label="Filter movies by genre">
              {genres.map((genre) => (
                <button
                  className={`genre-button${selectedGenre === genre ? ' is-selected' : ''}`}
                  key={genre}
                  type="button"
                  aria-pressed={selectedGenre === genre}
                  onClick={() => setSelectedGenre(genre)}
                >
                  {genre}
                </button>
              ))}
            </div>

            {isLoading ? (
              <div className="loading-state" role="status" aria-live="polite">
                <span className="spinner" aria-hidden="true" />
                <span>Loading the collection...</span>
              </div>
            ) : error ? (
              <p className="message-state" role="alert">{error}</p>
            ) : filteredMovies.length === 0 ? (
              <p className="message-state">No movies found.</p>
            ) : (
              <div className="movie-grid">
                {filteredMovies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    title={movie.title}
                    genre={movie.genre}
                    year={movie.year}
                    rating={movie.rating}
                    poster={movie.poster}
                    isAdded={watchlist.some((item) => item.id === movie.id)}
                    onAdd={() => addToWatchlist(movie)}
                  />
                ))}
              </div>
            )}
          </section>

          <Watchlist movies={watchlist} onRemove={removeFromWatchlist} />
        </div>
      </main>

      <footer className="footer"><span>REEL SHELF</span><span>MAKE ROOM FOR THE CREDITS.</span></footer>
    </div>
  );
}

export default App;