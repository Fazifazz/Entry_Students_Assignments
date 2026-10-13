function Watchlist({ watchlist, onRemove }) {
    return (
        <div className="watchlist-container">
            <h2 > <i class="fa-solid fa-bookmark"></i> My Watchlist ({watchlist.length})</h2>
            {watchlist.map((movie) => (
                <div className="watchlist-card" key={movie.id}>
                    <img
                        src={movie.poster}
                        alt={movie.title}
                        className="movie-image"
                    />
                    <div className="watchlist-details">
                        <h3>{movie.name}</h3>
                        <p>{movie.genre} . {movie.year}</p>
                        <button
                            className="remove-btn"
                            onClick={() => onRemove(movie.id)}
                        > <i className="fa-solid fa-trash"></i> Remove</button>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default Watchlist