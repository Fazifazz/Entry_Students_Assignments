function GenreFilter({ setGenre }) {
  return (
    <div className="filters">
      <button onClick={() => setGenre("All")}>All</button>
      <button onClick={() => setGenre("Action")}>Action</button>
      <button onClick={() => setGenre("Comedy")}>Comedy</button>
      <button onClick={() => setGenre("Drama")}>Drama</button>
    </div>
  );
}

export default GenreFilter;