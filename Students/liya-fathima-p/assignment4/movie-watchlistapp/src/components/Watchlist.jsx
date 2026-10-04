function Watchlist({ watchlist, onRemove }) {
  return (
    <div className="watchlist">
      <h2>My Watchlist</h2>

      {watchlist.length === 0 ? (
        <p>No movies added yet.</p>
      ) : (
        watchlist.map((movie) => (
          <div className="watchlist-item" key={movie.id}>
            <span>
              {movie.title} ({movie.year})
            </span>

            <button onClick={() => onRemove(movie.id)}>
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Watchlist;