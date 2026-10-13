import MovieCard from "./MovieCard";
import { useEffect, useState } from "react";
import axios from "axios";

function MovieList({genre}){
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
   
    
    useEffect(() => {
        async function renderMovieList(){
            try{
                const response = await axios.get("/movies.json")
                setMovies(genre.toUpperCase()!=="ALL"?  response.data.filter(m => m.genre === genre) : response.data);
                console.log(movies)
            }
            catch(err)
            {
                setError("Error Status : {err.response.status} <br> Error Message : {err.response.message}")
            }
            finally{
                setLoading(false);
            }

        }
        renderMovieList();
    }, [genre]);

    if(loading) 
          return(
       <div className="text-center mt-5">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading movies...</p>
        </div>)

    return(
            <>
                <h2 id="featured_pdts">Movie Collection</h2>
                <div className="container">
                    <div className="row g-4 featured-pdt-row">
                        {movies.length? movies.map(m => (<MovieCard key={m.id} {...m} wList={0} />)) : <p text-align='center'>No movies found in this genre</p>}
                    </div>
                </div> 
            </>   
        )
}

export default MovieList