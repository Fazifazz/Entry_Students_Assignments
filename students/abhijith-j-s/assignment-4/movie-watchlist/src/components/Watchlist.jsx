function Watchlist({ watchlist, onRemove }) {
  return (
    <aside className="watchlist">
      <h2>My Watchlist ({watchlist.length})</h2>

      {watchlist.length === 0 ? (
        <p className="muted">Your watchlist is empty. Add some movies!</p>
      ) : (
        <ul className="watchlist__list">
          {watchlist.map((movie) => (
            <li key={movie.id} className="watchlist__item">
              <div>
                <strong>{movie.title}</strong>
                <span className="muted">
                  {movie.genre} • {movie.year} • ★ {movie.rating}
                </span>
              </div>
              <button
                className="btn btn--danger"
                onClick={() => onRemove(movie.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}

export default Watchlist;