function MovieCard({ movie, onAdd, isAdded }) {
  return (
    <div className="card">
      <img src={movie.poster} alt={movie.title} />

      <h3>{movie.title}</h3>
      <p>🎭 {movie.genre}</p>
      <p>📅 {movie.year}</p>
      <p>⭐ {movie.rating}</p>

      <button onClick={() => onAdd(movie)} disabled={isAdded}>
        {isAdded ? "Added ✔" : "Add to Watchlist"}
      </button>
    </div>
  );
}

export default MovieCard;