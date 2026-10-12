function MovieCard({ title, genre, year, rating, onAdd, isAdded }) {
  return (
    <div className="movie-card">
      <h2>{title}</h2>

      <p>Genre: {genre}</p>
      <p>Year: {year}</p>
      <p>Rating: ⭐ {rating}</p>

      <button
        onClick={onAdd}
        disabled={isAdded}
      >
        {isAdded ? "Added" : "Add to Watchlist"}
      </button>
    </div>
  );
}

export default MovieCard;