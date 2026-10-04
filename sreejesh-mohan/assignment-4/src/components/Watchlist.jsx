import React from 'react';

const Watchlist = ({ watchlist, onRemove }) => {
  if (watchlist.length === 0) {
    return <div className="watchlist-empty">Your watchlist is empty.</div>;
  }

  return (
    <div className="watchlist">
      <h2>Your Watchlist</h2>
      <div className="watchlist-grid">
        {watchlist.map(movie => (
          <div key={movie.id} className="watchlist-card">
            <div className="watchlist-info">
              {movie.image && <img src={movie.image} alt={movie.title} className="watchlist-poster" />}
              <h4>{movie.title}</h4>
            </div>
            <button onClick={() => onRemove(movie.id)} className="btn-danger">
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Watchlist;
