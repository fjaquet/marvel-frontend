const Search = ({ search, setSearch }) => {
  const handleChangeSearch = (event) => {
    setSearch(event.target.value);
  };

  return (
    <header>
      <input
        type="text"
        name="search"
        id="search"
        value={search}
        onChange={handleChangeSearch}
      />
    </header>
  );
};

export default Search;
