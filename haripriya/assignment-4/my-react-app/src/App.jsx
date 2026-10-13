import { useEffect, useState } from 'react'
import axios from 'axios'

import './App.css'
import MovieCard from './assets/Components/MovieCard'
import Watchlist from './assets/Components/Watchlist';

function App() {
  const [movies, setMovies] = useState()
  const [watchlist, setWatchlist] = useState(() => {
    const savedWatchlist = localStorage.getItem("watchlist");
    return savedWatchlist ? JSON.parse(savedWatchlist) : [];
  })
  const [loading, setLoading] = useState(true)
  const [selectGenre, setSelectedGenre] = useState("All")

  useEffect(() => {
    axios.get('https://cinemeta-catalogs.strem.io/top/catalog/movie/top.json')
      .then((response) => {
        console.log(response.data)
        setMovies(response.data.metas)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error);
        setLoading(false)
      })
  }, [])

  // save watchlist to localstorage
  useEffect(() => {
    localStorage.setItem(
      "watchlist",
      JSON.stringify(watchlist)
    )
  }, [watchlist])
  const addToWatchlist = (movie) => {
    setWatchlist([...watchlist, movie])
  }
  const removeFromWatchlist = (movieId) => {
    setWatchlist(
      watchlist.filter((movie) => movie.id !== movieId)
    )
  }
  const filteredMovies = selectGenre === "All" ? movies :
    movies.filter((movie) => movie.genre?.includes(selectGenre));
  return (

    <div className="app  d-flex justify-content-between p-4">

      <div>
        <div>
          <h1 className="fs-3"> <i class="fa-solid fa-film"></i> MovieApp</h1>
        </div>
        <div className="genre-buttons mb-5 mt-4">
          <button onClick={() => setSelectedGenre("All")}>
            All
          </button>
          <button onClick={() => setSelectedGenre("Action")}>
            Action
          </button>
          <button onClick={() => setSelectedGenre("Comedy")}>
            Comedy
          </button>
          <button onClick={() => setSelectedGenre("Drama")}>
            Drama
          </button>
          <button onClick={() => setSelectedGenre("Triller")}>
            Triller
          </button>
        </div>

        {loading && (
          <div className="spinner-container">

            <div className="spinner"></div>

            <p>Loading movies...</p>

          </div>
        )}
        {!loading &&
          (<div className="movie-container">
            {filteredMovies.length === 0 ? <p className="nomovies">No movies found</p> :
              filteredMovies.map((movie) => {
                const isAdded = watchlist.some(
                  (item) => item.id === movie.id
                )
                return (
                  <MovieCard
                    key={movie.id}

                    image={movie.poster}
                    title={movie.name}
                    genre={movie.genres}

                    year={movie.releaseInfo}

                    rating={movie.imdbRating}
                    onAdd={() => addToWatchlist(movie)}
                    isAdded={isAdded}
                  />
                )
              })}
          </div>)}

      </div>
      <Watchlist
        watchlist={watchlist}
        onRemove={removeFromWatchlist}
      />


    </div>
  )
}

export default App

