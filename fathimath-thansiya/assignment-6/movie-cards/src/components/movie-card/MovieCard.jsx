import "./MovieCard.css";

export default function MovieCard({ movie, inWatchlist, onAdd }) {
  const { title, year, rating } = movie;
  const buttonLabel = inWatchlist ? "Added" : "Add to Watchlist";
  const handleClick = inWatchlist ? undefined : () => onAdd(movie);

  return (
    <article className="movie-card">
      <h3 className="movie-card__title">{title}</h3>
      <dl className="movie-card__meta">
        <div className="movie-card__row">
          <dt>Genre</dt>
          <dd>{movie.genre}</dd>
        </div>
        <div className="movie-card__row">
          <dt>Year</dt>
          <dd>{year}</dd>
        </div>
        <div className="movie-card__row">
          <dt>Rating</dt>
          <dd>
            <span className="movie-card__rating">{rating.toFixed(1)}</span>
          </dd>
        </div>
      </dl>
      <button
        type="button"
        className="movie-card__action"
        onClick={handleClick}
        disabled={inWatchlist}
      >
        {buttonLabel}
      </button>
    </article>
  );
}
