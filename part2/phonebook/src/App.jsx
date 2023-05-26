import { useEffect, useState } from "react";
import personsService from "./services/persons";

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

function PersonsList({ persons, searchValue, onDeleteClick }) {
	return persons
		.filter((person) =>
			person.name.toLowerCase().includes(searchValue.toLowerCase())
		)
		.map((person) => (
			<>
				<p key={person.name}>
					{person.name} | {person.number} | {person.id}
				</p>
				<button onClick={() => onDeleteClick(person._id)}>
					Delete
				</button>
			</>
		));
}

const Notification = ({ message }) => {
	if (message === null || message === "") {
		return null;
	}

	return <div className="error">{message}</div>;
};

function App() {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [searchValue, setSearchValue] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		console.log("Effect");
		personsService.getAll().then((res) => {
			console.log("setting persons");
			console.log(res);
			setPersons(res);
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

	const onDeleteClick = (id) => {
		const isDeleteConfirmed = window.confirm(
			`Are you sure you want to delete this person ?`
		);
		personsService
			.getById(id)
			.then(() => {
				if (isDeleteConfirmed) {
					personsService.deletePersonById(id);
					setPersons(persons.filter((person) => person._id !== id));
				}
			})
			.catch((res) => {
				setErrorMessage(
					"Information of this person has already been removed from server"
				);
				setTimeout(() => {
					setErrorMessage("");
				}, 5000);
				setPersons(persons.filter((person) => person.id !== id));
			});
	};

	const onFormSubmit = (event) => {
		event.preventDefault();
		const newNameExists =
			persons.filter((person) => person.name === newName).length > 0;
		if (newNameExists) {
			const isUpdateConfirmed = window.confirm(
				`The person that you're trying to add already exists. Want to replace the old number with a new one?`
			);
			if (isUpdateConfirmed) {
				const toUpdate = persons.filter(
					(person) => person.name === newName
				)[0];
				personsService
					.updatePersonNumber(toUpdate, newNumber)
					.then(() => {
						setErrorMessage("Updated a number");
						setTimeout(() => {
							setErrorMessage("");
						}, 5000);
					});
				setPersons(
					persons.map((person) =>
						person.id === toUpdate.id
							? { ...person, number: newNumber }
							: person
					)
				);
			}
			return;
		}
		const newPerson = { name: newName, number: newNumber };
		personsService
			.save(newPerson)
			.then(() => {
				setPersons(persons.concat(newPerson));
				setNewName("");
				setNewNumber("");
				setErrorMessage("Added a new person");
				setTimeout(() => {
					setErrorMessage("");
				}, 5000);
			})
			.catch((error) => {
				setErrorMessage(error.response.data.error);
				setTimeout(() => {
					setErrorMessage("");
				}, 5000);
			});
	};

	return (
		<div>
			<Notification message={errorMessage} />
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
			<PersonsList
				persons={persons}
				searchValue={searchValue}
				onDeleteClick={onDeleteClick}
			/>
		</div>
	);
}

export default App;
