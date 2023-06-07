import useCountry from "../hooks/useCountry";
import CountryDetails from "./CountryDetails";

function SearchResults({ searchResults, setSearchResults }) {
	if (searchResults.length === 0) {
		return (
			<>
				<p>No matches found. Please, try another search term</p>
			</>
		);
	} else if (searchResults.length === 1) {
		return (
			<>
				<CountryDetails searchResults={searchResults} />
			</>
		);
	} else if (searchResults.length <= 10) {
		return (
			<>
				{searchResults.map((result) => (
					<div key={result.name.common}>
						<span>{result.name.common}</span>
						<button onClick={() => setSearchResults([result])}>
							Show details
						</button>
					</div>
				))}
			</>
		);
	} else {
		return (
			<>
				<p>Too many matches, specify another filter</p>
			</>
		);
	}
}

export default SearchResults;