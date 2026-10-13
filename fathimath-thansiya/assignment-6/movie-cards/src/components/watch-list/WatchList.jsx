import "./WatchList.css";

export default function WatchList({ movies, onRemove }) {
  if (movies.length === 0) {
    return (
      <section className="watchlist watchlist--empty">
        <h2 className="watchlist__heading">My Watchlist</h2>
        <p className="watchlist__empty-msg">
          No movies are on your watchlist yet. Tap "Add to Watchlist" on any
          card to get started.
        </p>
      </section>
    );
  }

  return (
    <section className="watchlist">
      <h2 className="watchlist__heading">My Watchlist ({movies.length})</h2>
      <ul className="watchlist__list">
        {movies.map((movie) => (
          <li key={movie.id} className="watchlist__item">
            <div className="watchlist__info">
              <span className="watchlist__title">{movie.title}</span>
              <span className="watchlist__sub">
                {movie.genre} · {movie.year} · {movie.rating.toFixed(1)}
              </span>
            </div>
            <button
              type="button"
              className="watchlist__remove"
              onClick={() => onRemove(movie.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
