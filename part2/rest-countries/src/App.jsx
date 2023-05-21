import { useEffect, useState } from "react";
import "./App.css";
import countriesService from "./services/countries";
import weatherService from "./services/weather";

function CapitalWeather({ capital }) {
	const [capitalWeather, setCapitalWeather] = useState(null);

	useEffect(() => {
    weatherService.getWeather(capital).then((res) => {
      console.log(res);
      setCapitalWeather(res);
    });
  }, [])

	if (!capitalWeather) {
		return (
			<>
				<p>Weather loading...</p>
			</>
		);
	}

	return (
		<>
			<h5>Weather in {capital}</h5>
			<p>Temperature: {capitalWeather.main.temp / 10 }°C</p>
			<img src={weatherService.getIconUrl(capitalWeather.weather[0].icon)}/>
			<p>Wind: {capitalWeather.wind.speed} m/s</p>
		</>
	);
}

function CountryDetails({ countryData }) {
	return (
		<>
			<h2>{countryData.name.official}</h2>
			<p>Capital: {countryData.capital[0]}</p>
			<p>Area: {countryData.area}</p>
			<h5>Languages:</h5>
			<ul>
				{Object.values(countryData.languages).map((lang) => (
					<li>{lang}</li>
				))}
			</ul>
			<p style={{ fontSize: "20em", margin: -100 }}>{countryData.flag}</p>
			<CapitalWeather capital={countryData.capital[0]} />
		</>
	);
}

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
				<CountryDetails countryData={searchResults[0]} />
			</>
		);
	} else if (searchResults.length <= 10) {
		return (
			<>
				{searchResults.map((result) => (
					<div>
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

	return {};
}

function App() {
	const [searchValue, setSearchValue] = useState("");
	const [countries, setContries] = useState([]);
	const [searchResults, setSearchResults] = useState([]);

	useEffect(() => {
		countriesService.getAll().then((data) => {
			setContries(data);
		});
	}, []);

	useEffect(() => {
		if (searchValue === null || searchValue === "") {
			setSearchResults([]);
		}

		const newSearchResults = countries.filter((country) =>
			country.name.common
				.toLowerCase()
				.includes(searchValue.toLowerCase())
		);
		setSearchResults(newSearchResults);
	}, [searchValue]);

	const onSearchValueChange = (event) => {
		const newValue = event.target.value;
		console.log(newValue);
		setSearchValue(newValue);
	};

	return (
		<>
			<div>
				<input
					defaultValue={searchValue}
					onChange={onSearchValueChange}
				/>
			</div>
			<div>
				<SearchResults
					searchResults={searchResults}
					setSearchResults={setSearchResults}
				/>
			</div>
		</>
	);
}

export default App;
