const { default: mongoose } = require("mongoose");

const mongoUrl = process.env.MONGO_URI;

mongoose
	.connect(mongoUrl)
	.then(() => console.log("Connection with mongo was sucessful"))
	.catch((error) =>
		console.error(
			"There is an error with the mongo connection: ",
			error.message
		)
	);

const schema = mongoose.Schema({
	name: String,
	number: String,
});


module.exports = mongoose.model("Person", schema);
