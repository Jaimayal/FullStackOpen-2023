import axios from "axios";

const baseApiUrl = "https://restcountries.com/v3.1";

function getAll() {
	return axios
		.get(`${baseApiUrl}/all`)
		.then((res) => res.data)
		.catch((err) => {
			console.log(err);
		});
}

function getByName(name) {
	return axios.get(`${baseApiUrl}/name/${name}`).then((res) => {
		console.log(res);
		return res.data;
	});
}

export default { getAll, getByName };
