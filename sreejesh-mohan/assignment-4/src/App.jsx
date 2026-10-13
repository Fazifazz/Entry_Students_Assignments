import { useState, useEffect } from 'react'
import axios from 'axios'
import MovieCard from './components/MovieCard'
import Watchlist from './components/Watchlist'
import './App.css'

function App() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [watchlist, setWatchlist] = useState([])
  const [selectedGenre, setSelectedGenre] = useState('All')

  const genres = ['All', 'Action', 'Comedy', 'Drama']

  useEffect(() => {
    // Fetch movies from local movies.json
    axios.get('/movies.json')
      .then(response => {
        // Added artificial delay so the loading spinner is visible!
        setTimeout(() => {
          setMovies(response.data)
          setLoading(false)
        }, 1500)
      })
      .catch(error => {
        console.error("Error fetching movies:", error)
        setLoading(false)
      })
  }, [])

  const addToWatchlist = (movie) => {
    if (!watchlist.find(item => item.id === movie.id)) {
      setWatchlist([...watchlist, movie])
    }
  }

  const removeFromWatchlist = (id) => {
    setWatchlist(watchlist.filter(item => item.id !== id))
  }

  const filteredMovies = selectedGenre === 'All' 
    ? movies 
    : movies.filter(movie => movie.genre === selectedGenre)

  return (
    <div className="app-container">
      <header>
        <h1>Movie Watchlist</h1>
      </header>
      
      <main>
        <section className="movies-section">
          <h2>Movies</h2>
          
          <div className="filters">
            {genres.map(genre => (
              <button 
                key={genre} 
                onClick={() => setSelectedGenre(genre)}
                className={selectedGenre === genre ? 'active-filter' : 'filter-btn'}
              >
                {genre}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="spinner">Loading...</div>
          ) : (
            <>
              {filteredMovies.length === 0 ? (
                <p className="no-movies">No movies found</p>
              ) : (
                <div className="movies-grid">
                  {filteredMovies.map(movie => (
                    <MovieCard 
                      key={movie.id} 
                      title={movie.title}
                      genre={movie.genre}
                      year={movie.year}
                      rating={movie.rating}
                      image={movie.image}
                      movieObj={movie}
                      isAdded={watchlist.some(item => item.id === movie.id)}
                      onAdd={addToWatchlist}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </section>

        <aside className="watchlist-section">
          <Watchlist watchlist={watchlist} onRemove={removeFromWatchlist} />
        </aside>
      </main>
    </div>
  )
}

export default App
