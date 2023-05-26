require("dotenv").config();
const Person = require("./models/Person");
const morgan = require("morgan");
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static("build"));
app.use(
	morgan(function (tokens, req, res) {
		console.log(req);
		return [
			tokens.method(req, res),
			tokens.url(req, res),
			tokens.status(req, res),
			tokens.res(req, res, "content-length"),
			"-",
			tokens["response-time"](req, res),
			"ms",
		].join(" ");
	})
);

app.get("/api/persons", (request, response) => {
	Person.find({}).then((entries) => {
		response.send(entries);
	});
});

app.get("/api/persons/:id", (request, response) => {
	Person.findById(request.params.id)
		.then((person) => {
			console.log(person);
			response.send(person);
		})
		.catch(() => {
			response.status(404).send({
				error: "Person was not found",
			});
		});
});

app.get("/info", (request, response) => {
	response.send(`
    <p>Phonebook has info for ${phonebookEntries.length}</p>
    <p>${new Date()}</p>`);
});

app.post("/api/persons", (request, response) => {
	const entry = request.body;
	if (!entry) {
		return response.status(400).send({
			error: "You must include an entry",
		});
	}

	if (!entry.name) {
		return response.status(400).send({
			error: "Name cannot be empty",
		});
	}

	if (!entry.number) {
		return response.status(400).send({
			error: "Number cannot be empty",
		});
	}

	const toSave = new Person({
		name: entry.name,
		number: entry.number,
	});

	toSave.save().then((result) => {
		response
			.status(201)
			.send("The person was saved successfully");
	});
});

// app.delete("/api/persons/:id", (request, response) => {
// 	const id = Number(request.params.id);
// 	const newPhonebookEntries = phonebookEntries.filter(
// 		(entry) => entry.id !== id
// 	);
// 	if (newPhonebookEntries.length === phonebookEntries.length) {
// 		return response.sendStatus(404);
// 	}
// 	phonebookEntries = newPhonebookEntries;
// 	response.sendStatus(204);
// });

// app.post("/api/persons", (request, response) => {
// 	const entry = request.body;
// 	if (!entry) {
// 		return response.status(400).send({
// 			error: "You must include an entry",
// 		});
// 	}

// 	if (!entry.name) {
// 		return response.status(400).send({
// 			error: "Name cannot be empty",
// 		});
// 	}

// 	if (!entry.number) {
// 		return response.status(400).send({
// 			error: "Number cannot be empty",
// 		});
// 	}

// 	const nameExists = phonebookEntries.find(
// 		(phoneEntry) => entry.name === phoneEntry.name
// 	);
// 	if (nameExists) {
// 		return response.status(400).send({
// 			error: "Name already exists in the phonebook",
// 		});
// 	}

// 	const newEntry = {
// 		id: getNextId(),
// 		name: entry.name,
// 		number: entry.number,
// 	};
// 	phonebookEntries = phonebookEntries.concat(newEntry);
// 	response.send(201);
// });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
