function SearchFilter({ applyFilter }) {
  return (
    <>
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search anecdotes"
        onChange={applyFilter}
      />
    </>
  )
}

export default SearchFilter
