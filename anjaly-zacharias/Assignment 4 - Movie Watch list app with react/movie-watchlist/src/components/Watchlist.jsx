function Watchlist({ list, onRemove }) {
  return (
    <div className="watchlist">
      <h2>My Watchlist</h2>

      {list.length === 0 ? (
        <p>No movies added yet</p>
      ) : (
        list.map((movie) => (
          <div key={movie.id} className="watch-item">
            <span>{movie.title}</span>
            <button onClick={() => onRemove(movie.id)}>Remove</button>
          </div>
        ))
      )}
    </div>
  );
}

export default Watchlist;