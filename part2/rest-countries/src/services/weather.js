import axios from "axios";

const api_key = import.meta.env.VITE_APP_API_KEY
const baseApiUrl = "https://api.openweathermap.org";

function getWeather(city) {
	return axios
		.get(`${baseApiUrl}/data/2.5/weather?q=${city}&appid=${api_key}`)
		.then((res) => res.data);
}

function getIconUrl(icon) {
	return `https://openweathermap.org/img/wn/${icon}@2x.png`
}

export default { getWeather, getIconUrl };
