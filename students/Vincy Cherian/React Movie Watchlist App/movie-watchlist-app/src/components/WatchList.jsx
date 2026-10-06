import { useState, useEffect } from "react"
import MovieCard from "./MovieCard"

function WatchList(){

    const [list, setList] = useState(JSON.parse(localStorage.getItem('watchList')) || [])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        try{
            setList(JSON.parse(localStorage.getItem('watchList')) || [])
            //const currentWatchList = JSON.parse(localStorage.getItem('watchList')) || []
            //setList(currentWatchList.filter(m => m.genre === genre))
        }
        catch(err) {
           setError(<p>Error Status : {err.response.status} <br></br> Error Message : {err.response.message}</p>)
        }
        finally{
            setLoading(false)
        }
    },[])

    if(loading){
       return (
       <div className="text-center mt-5">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading movies...</p>
        </div>)
    }

    function handleMovieRemoved(updList){
        setList(updList)
    }

    return(
            <>
                <h2 id="featured_pdts">WatchList</h2>
                <div className="container">
                    <div className="row g-4 featured-pdt-row">
                        { list.length?
                             list.map(w => (<MovieCard key={w.id} {...w} wList={1} onRemove={handleMovieRemoved}/>)) : 
                                <p>No movies in WatchList</p>
                                }
                        
                    </div>
                </div> 
            </>   
        )
}


export default WatchList;