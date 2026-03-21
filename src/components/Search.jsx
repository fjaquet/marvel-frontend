import "../styles/components/search.css";

const Search = ({ search, setSearch, page, setPage }) => {
  const handleChangeSearch = (event) => {
    if (page !== 1) {
      setPage(1);
    }
    setSearch(event.target.value);
  };

  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="SEARCH CHARACTERS..."
          value={search}
          onChange={handleChangeSearch}
          className="search-input"
        />
      </div>
    </div>
  );
};

export default Search;
