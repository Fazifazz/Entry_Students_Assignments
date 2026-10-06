function MovieCard({ title, genre, year, rating, poster, isAdded, onAdd }) {
  return (
    <article className="movie-card">
      <div className="poster-wrap">
        <img className="movie-poster" src={poster} alt={`${title} poster`} loading="lazy" />
        <span className="poster-year">{year}</span>
      </div>
      <div className="movie-details">
        <div className="movie-title-row">
          <h3>{title}</h3>
          <span className="rating"><span aria-hidden="true">★</span> {rating}</span>
        </div>
        <p className="movie-meta">{genre}<span aria-hidden="true"> / </span>{year}</p>
        <button className={`add-button${isAdded ? ' is-added' : ''}`} type="button" onClick={onAdd} disabled={isAdded}>
          <span aria-hidden="true">{isAdded ? '✓' : '+'}</span> {isAdded ? 'Added' : 'Add to Watchlist'}
        </button>
      </div>
    </article>
  );
}

export default MovieCard;