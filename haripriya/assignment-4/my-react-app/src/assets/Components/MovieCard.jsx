function MovieCard({ image, title, genre, year, rating, onAdd, isAdded }) {
    return (
        <div >
            <div className="movie-card ">
                <img className="movie-image" src={image} alt={title} />
                <div className="movie-details">
                    <h2>{title}</h2>
                    <p className="movie-info">{genre} . {year}</p>
                    <p className="rating">&#11088; {rating}</p>
                    <button
                        className="watchlist-btn"
                        onClick={onAdd}
                        disabled={isAdded}
                    >
                        {isAdded ? "Added" : "Add to Watchlist"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MovieCard