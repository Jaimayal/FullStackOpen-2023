const logger = require("./logger");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const errorHandler = (error, request, response, next) => {
	logger.error(error.message);

	if (error.name === "CastError") {
		return response.status(400).send({ error: "malformatted id" });
	} else if (error.name === "ValidationError") {
		return response.status(400).json({ error: error.message });
	} else if (error.name === "JsonWebTokenError") {
		return response.status(400).json({ error: error.message });
	}

	next(error);
};

const tokenExtractor = (request, response, next) => {
	const authorization = request.get("authorization");
	if (!authorization || !authorization.startsWith("Bearer ")) {
		next();
		return;
	}

	const token = authorization.replace("Bearer ", "");
	request.token = token;
	next();
};

const userExtractor = async (request, response, next) => {
	const token = request.token;
	if (!token) {
		request.user = null;
		next()
		return;
	}

	let id = "";
	try {
		id = jwt.verify(token, process.env.SECRET).id;
	} catch (exception) {
		request.user = null;
		next()
		return;
	}

	const user = await User.findById(id);
	request.user = user;
	next();
};

module.exports = {
	errorHandler,
	tokenExtractor,
	userExtractor
};
