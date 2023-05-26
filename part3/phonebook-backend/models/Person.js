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
	name: {
		type: String,
		minlength: 3,
		required: true,
	},
	number: {
		type: String,
		minlength: 8,
		validate: {
			validator: function (v) {
				return /\d{2,3}-\d{6,8}/.test(v);
			},
			message: (props) => `${props.value} is not a valid phone number!`,
		},
	},
});

module.exports = mongoose.model("Person", schema);
