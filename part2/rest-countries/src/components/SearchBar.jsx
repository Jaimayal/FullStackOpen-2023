function SearchBar({ searchValue, onSearchValueChange }) {
	return (
		<div>
			<input defaultValue={searchValue} onChange={onSearchValueChange} />
		</div>
	);
}

export default SearchBar;
