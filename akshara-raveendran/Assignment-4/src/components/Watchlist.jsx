function Watchlist({ watchlist, onRemove }) {
  return (
    <div className="watchlist">

      <h2>My Watchlist</h2>

      {watchlist.length === 0 ? (
        <p className="empty-watchlist">
          No movies found
        </p>
      ) : (
        <div className="watchlist-items">

          {watchlist.map((movie) => (
            <div
              className="watchlist-item"
              key={movie.id}
            >

              <div>
                <h3>{movie.title}</h3>

                <p>
                  {movie.genre} • {movie.year} • ⭐ {movie.rating}
                </p>
              </div>

              <button
                onClick={() => onRemove(movie.id)}
              >
                Remove
              </button>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default Watchlist;