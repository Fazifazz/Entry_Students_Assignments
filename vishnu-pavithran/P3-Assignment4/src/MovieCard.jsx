function MovieCard({
  title,
  genre,
  year,
  rating,
  poster,
  addToWatchlist,
  isInWatchlist,
}) {
  return (
    <div className="movie-card">
      <div className="movie-card-content">
        <div className="movie-poster">
          <img src={poster}></img>
        </div>

        <div className="movie-details">
          <h2 className="movie-title">{title}</h2>

          <span className="movie-rating">⭐ {rating}</span>
        </div>
        <ul className="movie-detail-bottom">
          <li className="movie-year">{year}</li>
          <li className="movie-badge">{genre}</li>
        </ul>
        <div className="btn-wrap">
          {isInWatchlist ? (
            <button className="btn btn-watchlist" disabled>
              Added
            </button>
          ) : (
            <button
              className="btn btn-watchlist cursor-pointer"
              onClick={addToWatchlist}
            >
              Add to Watchlist
            </button>
          )}

          <button className="btn btn-booknow">Book Now</button>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
