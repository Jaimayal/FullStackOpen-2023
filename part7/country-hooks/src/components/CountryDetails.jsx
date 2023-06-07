import useCountry from "../hooks/useCountry";
import CapitalWeather from "./CapitalWeather";

function CountryDetails({ searchResults }) {
	const countryData = useCountry(searchResults[0].name.common)

	if (!countryData) {
		return (
			<>
				<p>Loading...</p>
			</>
		)
	}

	return (
		<>
			<h2>{countryData.name.official}</h2>
			<p>Capital: {countryData.capital[0]}</p>
			<p>Area: {countryData.area}</p>
			<h5>Languages:</h5>
			<ul>
				{Object.values(countryData.languages).map((lang, i) => (
					<li key={i}>{lang}</li>
				))}
			</ul>
			<p style={{ fontSize: "20em", margin: -100 }}>{countryData.flag}</p>
			<CapitalWeather capital={countryData.capital[0]} />
		</>
	);
}

export default CountryDetails;
