import axios from "axios";

const baseApiUrl = "http://localhost:3001/persons";

function getAll() {
	return axios.get(baseApiUrl).then((res) => res.data);
}

function save(person) {
	return axios.post(baseApiUrl, person).then((res) => res.data);
}

function deletePersonById(id) {
	return axios.delete(`${baseApiUrl}/${id}`).then((res) => res.data);
}

function updatePersonNumber(person, newNumber) {
	return axios
		.put(`${baseApiUrl}/${person.id}`, { ...person, number: newNumber })
		.then((res) => res.data);
}

export default { getAll, save, deletePersonById, updatePersonNumber };
