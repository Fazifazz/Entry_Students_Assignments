function MovieCard({ title, genre, year, rating, isAdded, onAdd }) {
  return (
    <article className="movie-card">
      <div className="movie-card__top">
        <span className="badge">{genre}</span>
        <span className="rating">★ {rating}</span>
      </div>
      <h3 className="movie-card__title">{title}</h3>
      <p className="movie-card__year">{year}</p>
      <button
        className={`btn ${isAdded ? "btn--added" : "btn--primary"}`}
        onClick={onAdd}
        disabled={isAdded}
      >
        {isAdded ? "Added" : "Add to Watchlist"}
      </button>
    </article>
  );
}

export default MovieCard;