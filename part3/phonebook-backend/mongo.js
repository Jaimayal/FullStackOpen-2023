const { default: mongoose } = require("mongoose");

const password = process.argv[2];
console.log("Password: ", password);
const mongoUrl = `mongodb+srv://Jaimayal:${password}@cluster0.k7ra8d6.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

mongoose.connect(mongoUrl);

const schema = mongoose.Schema({
	name: String,
	phone: String,
});

const Person = mongoose.model("Person", schema);

function savePerson(person) {
	const name = person.name;
	const phone = person.phone;
	const per = new Person({
		name,
		phone,
	});
	return per.save();
}

function retrieveAllPersons() {
	return Person.find({});
}

if (process.argv.length > 3) {
	const name = process.argv[3];
	const phone = process.argv[4];
	savePerson({
		name,
		phone,
	}).then((result) => {
		console.log("Person saved!");
		mongoose.connection.close();
	});
} else {
	retrieveAllPersons().then((result) => {
		console.log("Phonebook:");
		result.forEach((person) => {
			console.log(person.name, person.phone);
		});
		mongoose.connection.close();
	});
}
