import { useEffect, useState } from "react";
import axios from "axios";

function SearchBar({ searchValue, onSearchInputChange }) {
	return (
		<div>
			<input defaultValue={searchValue} onChange={onSearchInputChange} />
		</div>
	);
}

function CreatePersonForm({
	newName,
	onNameInputChange,
	newNumber,
	onNumberInputChange,
	onFormSubmit,
}) {
	return (
		<form onSubmit={onFormSubmit}>
			<div>
				name:{" "}
				<input defaultValue={newName} onChange={onNameInputChange} />
			</div>
			<div>
				number:{" "}
				<input
					defaultValue={newNumber}
					onChange={onNumberInputChange}
				/>
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	);
}

function PersonsList({ persons, searchValue }) {
	return persons
		.filter((person) =>
			person.name.toLowerCase().includes(searchValue.toLowerCase())
		)
		.map((person) => (
			<p key={person.name}>
				{person.name} | {person.number}
			</p>
		));
}

function App() {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [searchValue, setSearchValue] = useState("");

	useEffect(() => {
		console.log("Effect");
		axios
			.get("http://localhost:3001/persons")
			.then((res) => {
				console.log("setting persons");
				console.log(res.data);
				setPersons(res.data);
			});
	}, []);
	
	const onNameInputChange = (event) => {
		const updatedValue = event.target.value;
		setNewName(updatedValue);
	};

	const onNumberInputChange = (event) => {
		const updatedValue = event.target.value;
		setNewNumber(updatedValue);
	};

	const onSearchInputChange = (event) => {
		const updatedValue = event.target.value;
		setSearchValue(updatedValue);
	};

	const onFormSubmit = (event) => {
		event.preventDefault();
		const newNameExists =
			persons.filter((person) => person.name === newName).length > 0;
		if (newNameExists) {
			alert(`${newName} already exists`);
			return;
		}

		setPersons(persons.concat({ name: newName, number: newNumber }));
		setNewName("");
		setNewNumber("");
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<SearchBar
				onSearchInputChange={onSearchInputChange}
				searchValue={searchValue}
			/>
			<h3>add a new</h3>
			<CreatePersonForm
				newName={newName}
				newNumber={newNumber}
				onFormSubmit={onFormSubmit}
				onNameInputChange={onNameInputChange}
				onNumberInputChange={onNumberInputChange}
			/>
			<h2>Numbers</h2>
			<PersonsList persons={persons} searchValue={searchValue} />
		</div>
	);
}

export default App;
