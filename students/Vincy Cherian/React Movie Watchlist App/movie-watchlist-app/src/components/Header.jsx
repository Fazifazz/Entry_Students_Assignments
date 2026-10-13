import logo from '../assets/logo.png'
import MovieList from './MovieList'
import WatchList from './WatchList'
import { useState, useEffect } from "react"

function Header({setPage, setGenre, page, genre}){

    // const [genreSelected, setgenreSelected] = useState("All")

    function setPageFn(pg){
       
       if( pg === "home")
        {
            setPage("home")
            setGenre("All")
        }
        else{
            setPage("watchList")
            setGenre("")
        }  
    }

    return(
        <header>
            {/*  NavBar */}
            <nav id="movie-navbar" className="navbar navbar-expand-lg" >
                <a className="navbar-brand" href="#">
                    <img src={logo} alt="Mallu Movie Hub Logo" />
                </a>
            
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
            
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <button className={`nav-link ${genre === "All"? "selGenre" : ''}`} onClick={() => setPageFn("home")}><b>HOME</b></button>
                        </li>
                     { page === "home" &&  
                        <>
                            <li className="nav-item">
                                <button className={`nav-link ${genre === "ALL"? "selGenre" : ''}`} onClick={() => setGenre("ALL")}><b>ALL</b></button>
                            </li>
                            <li className="nav-item">
                                <button className={`nav-link ${genre === "Action"? "selGenre" : ''}`} onClick={() => setGenre("Action")}><b>ACTION</b></button>
                            </li>
                            <li className="nav-item">
                                <button className={`nav-link ${genre === "Comedy"? "selGenre" : ''}`} onClick={() => setGenre("Comedy")}><b>COMEDY</b></button>
                            </li>
                            <li className="nav-item">
                                <button className={`nav-link ${genre === "Drama"? "selGenre" : ''}`} onClick={() => setGenre("Drama")}><b>DRAMA</b></button>
                            </li>
                            <li className="nav-item">
                                <button className={`nav-link ${genre === "Romance"? "selGenre" : ''}`} onClick={() => setGenre("Romance")}><b>ROMANCE</b></button>
                            </li>
                            <li className="nav-item">
                                <button className={`nav-link ${genre === "Thriller"? "selGenre" : ''}`} onClick={() => setGenre("Thriller")}><b>THRILLER</b></button>
                            </li>
                            <li className="nav-item">
                                <button className={`nav-link ${genre === "Fiction"? "selGenre" : ''}`} onClick={() => setGenre("Fiction")}><b>FICTION</b></button>
                            </li>
                        </>
                        }
                        <li className="nav-item">
                                {/* <span id="watchList-icon" class="bi bi-heart"></span> */}
                                <button className={`nav-link ${genre === ""? "selGenre" : ''}`} onClick={() => setPageFn("watchList")}><b>WATCHLIST</b></button>
                        </li>
                    </ul>
                </div>                          
            </nav>    
        </header>
    )
}


export default Header