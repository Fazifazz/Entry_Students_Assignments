import { useState, useEffect } from "react"

function MovieCard({id,title, genre, year, rating,poster,wList,onRemove})
{
    const [wtList, setWtList] = useState(JSON.parse(localStorage.getItem('watchList'))|| [])

    const isAdded = wtList.some(l=>l.id === id)
    
    
    function handleAddWatchList({id, title, genre, year, rating,poster})
    {
        const currentWatchList = JSON.parse(localStorage.getItem('watchList')) || []   
        const updWatchList = [ ...currentWatchList,{id, title, genre, year, rating, poster}]
        localStorage.setItem('watchList', JSON.stringify(updWatchList))
        setWtList(updWatchList)
    }

     function handleRemoveWatchList(wid){
        const currentWatchList = JSON.parse(localStorage.getItem('watchList')) || []
        const updWatchList = currentWatchList.filter(wL => (wL.id !== id))
        setWtList(updWatchList)
        localStorage.setItem('watchList', JSON.stringify(updWatchList))
        onRemove(updWatchList)
    }

    return(
        <div className="col-12 col-sm-6 col-lg-3">
            <article className="card h-100" key={id}>
                <a href="">
                    <img src={poster} className="card-img-top mx-auto feat-pdt-img" alt={title} />
                </a>
                <div className="card-body">
                    <h5 className="card-title">{title.substring(0,14)+"..."}</h5>
                    <div className="card-text"> {genre} </div>
                    <div className="card-text">Rating : {rating}/10</div>
                    <div className="card-text"> Released Year : {year}</div><br></br>
                    { wList===0?
                    (
                       isAdded?
                        <button onClick={()=>handleAddWatchList({id,title,genre,year,rating,poster})} className="btn btn-primary" disabled> ADDED </button> : 
                        <button onClick={()=>handleAddWatchList({id,title,genre,year,rating,poster})} className="btn btn-primary"> ADD TO WATCHLIST </button>
                    ): <button onClick={()=>handleRemoveWatchList({id})} className="btn btn-primary">REMOVE</button>}
                </div>
            </article>
        </div>
    )

}

export default MovieCard