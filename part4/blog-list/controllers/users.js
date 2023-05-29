const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const logger = require("../utils/logger");
usersRouter.get("", (request, response) => {
	User.find({}).populate("blogs", {
		url: 1,
		title: 1,
		author: 1,
		id: 1,
	}).then((users) => {
		response.json(users);
	});
});

usersRouter.post("", async (request, response, next) => {
	const { username, name, password } = request.body;

	if (!password || password.length < 3) {
		return response
			.status(400)
			.json({ error: "Password must be at least 3 characters long" });
	}

	let finalUsername = "";

	if (username) {
		finalUsername = username;
	}

	const hashedPassword = await bcrypt.hash(password, 10);
	const user = new User({
		username: finalUsername,
		password: hashedPassword,
		name: name,
	});
	try {
		const result = await user.save();
		response.status(201).json(result);
	} catch (exception) {
		next(exception);
	}
});

module.exports = usersRouter;
