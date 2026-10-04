function SearchBar({ setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search movies..."
      onChange={(e) => setSearch(e.target.value)}
      className="search"
    />
  );
}

export default SearchBar;