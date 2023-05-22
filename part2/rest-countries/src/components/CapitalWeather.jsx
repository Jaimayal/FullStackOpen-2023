import weatherService from "../services/weather"
import { useState, useEffect } from "react";

function CapitalWeather({ capital }) {
	const [capitalWeather, setCapitalWeather] = useState(null);

	useEffect(() => {
		weatherService.getWeather(capital).then((res) => {
			console.log(res);
			setCapitalWeather(res);
		});
	}, []);

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
			<p>Temperature: {capitalWeather.main.temp / 10}°C</p>
			<img
				src={weatherService.getIconUrl(capitalWeather.weather[0].icon)}
			/>
			<p>Wind: {capitalWeather.wind.speed} m/s</p>
		</>
	);
}

export default CapitalWeather;