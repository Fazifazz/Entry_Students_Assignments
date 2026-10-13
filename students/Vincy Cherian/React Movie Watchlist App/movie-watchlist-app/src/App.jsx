import { useState, useEffect } from 'react'
import './App.css'

import Header from './components/Header'
import MovieList from './components/MovieList'
import WatchList from './components/WatchList'

function App() {

  const [page,setPage] = useState("home")
  const [genre,setGenre] = useState("All")

  return (
    <>
      <Header setPage={setPage} setGenre={setGenre} page={page} genre={genre}/>
      {page === "home" ? <MovieList genre={genre} />: <WatchList/>}
    </>
  )
}

export default App
