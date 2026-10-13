function MovieCard({
  id,
  title,
  genre,
  year,
  rating,
  description,
  image,
  onAdd,
  isAdded
}) {
  return (
    <div className="card movie-card h-100 shadow-sm">

      <img
        src={image}
        alt={title}
        className="card-img-top movie-image"
      />

      <div className="card-body d-flex flex-column">

        <h5 className="card-title fw-bold">
          {title}
        </h5>

        <p className="card-text">
          <strong>Genre:</strong> {genre}
        </p>

        <p className="card-text">
          <strong>Year:</strong> {year}
        </p>

        <p className="card-text">
          <strong>Rating:</strong> ⭐ {rating}/10
        </p>
        <p className="movie-description">
          {description}
        </p>
        <button
          className={`btn mt-auto ${
            isAdded ? "btn-secondary" : "btn-dark"
          }`}
          onClick={() =>
            onAdd({
              id,
              title,
              genre,
              year,
              rating,
              image
            })
          }
          disabled={isAdded}
        >
          {isAdded ? "✓ Added" : "+ Add to Watchlist"}
        </button>

      </div>

    </div>
  );
}

export default MovieCard;