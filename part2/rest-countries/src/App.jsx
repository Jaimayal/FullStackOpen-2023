import { useEffect, useState } from "react";
import "./App.css";
import countriesService from "./services/countries";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";

function App() {
	const [searchValue, setSearchValue] = useState("");
	const [countries, setContries] = useState([]);
	const [searchResults, setSearchResults] = useState([]);

	const initializeCountries = () => {
		countriesService.getAll().then((data) => {
			setContries(data);
		});
	}

	const updateSearchResults = () => {
		if (searchValue === null || searchValue === "") {
			setSearchResults([]);
		}
		
		const newSearchResults = countries.filter((country) =>
		country.name.common
		.toLowerCase()
		.includes(searchValue.toLowerCase())
		);
		setSearchResults(newSearchResults);
	}
	
	const onSearchValueChange = (event) => {
		const newValue = event.target.value;
		setSearchValue(newValue);
	};

	useEffect(initializeCountries, []);
	useEffect(updateSearchResults, [searchValue]);

	return (
		<>
			<SearchBar searchValue={searchValue} onSearchValueChange={onSearchValueChange} />
			<SearchResults
				searchResults={searchResults}
				setSearchResults={setSearchResults}
			/>
		</>
	);
}

export default App;
