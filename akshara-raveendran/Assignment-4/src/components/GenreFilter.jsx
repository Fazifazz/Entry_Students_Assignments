function GenreFilter({
  genres,
  selectedGenre,
  onGenreChange
}) {
  return (
    <div className="genre-filter">

      {genres.map((genre) => (
        <button
          key={genre}
          onClick={() => onGenreChange(genre)}
          className={
            selectedGenre === genre
              ? "active"
              : ""
          }
        >
          {genre}
        </button>
      ))}

    </div>
  );
}

export default GenreFilter;