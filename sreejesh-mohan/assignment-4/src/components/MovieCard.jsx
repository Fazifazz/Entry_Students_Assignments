import React from 'react';

const MovieCard = ({ title, genre, year, rating, image, movieObj, isAdded, onAdd }) => {
  return (
    <div className="movie-card">
      {image && <img src={image} alt={title} className="movie-poster" />}
      <h3>{title}</h3>
      <p><strong>Genre:</strong> {genre}</p>
      <p><strong>Year:</strong> {year}</p>
      <p><strong>Rating:</strong> {rating}</p>
      <button 
        onClick={() => onAdd(movieObj)} 
        disabled={isAdded}
        className={isAdded ? "btn-disabled" : "btn-primary"}
      >
        {isAdded ? 'Added' : 'Add to Watchlist'}
      </button>
    </div>
  );
};

export default MovieCard;
