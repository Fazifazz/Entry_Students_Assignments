function Watchlist({ movies, onRemove }) {
  return (
    <aside className="watchlist" id="watchlist" aria-labelledby="watchlist-title">
      <div className="watchlist-heading">
        <div>
          <p className="eyebrow">YOUR SHORTLIST</p>
          <h2 id="watchlist-title">Watchlist <span className="watchlist-count">{movies.length}</span></h2>
        </div>
        <span className="ticket-icon" aria-hidden="true">▤</span>
      </div>

      {movies.length === 0 ? (
        <div className="watchlist-empty">
          <span className="empty-reel" aria-hidden="true">◎</span>
          <p>Your next favorite<br />starts here.</p>
          <span>ADD A FILM TO GET STARTED</span>
        </div>
      ) : (
        <ul className="watchlist-items">
          {movies.map((movie) => (
            <li className="watchlist-item" key={movie.id}>
              <img src={movie.poster} alt="" loading="lazy" />
              <div className="watchlist-item-copy">
                <h3>{movie.title}</h3>
                <span>{movie.genre} · {movie.year}</span>
              </div>
              <button
                className="remove-button"
                type="button"
                aria-label={`Remove ${movie.title} from watchlist`}
                onClick={() => onRemove(movie.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="watchlist-footnote"><span className="status-dot" /> {movies.length} {movies.length === 1 ? 'FILM' : 'FILMS'} SAVED</div>
    </aside>
  );
}

export default Watchlist;