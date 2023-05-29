const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const getUserFromRequest = async (request) => {
	const token = request.token
	if (!token) {
		return null;
	}

	let id = "";
	try {
		id = jwt.verify(token, process.env.SECRET).id;
	} catch(exception) {
		return null;
	}

	return await User.findById(id);
}

blogsRouter.get("", (request, response) => {
	Blog.find({})
		.populate("user", {
			username: 1,
			name: 1,
			id: 1,
		})
		.then((blogs) => {
			response.json(blogs);
		});
});

blogsRouter.post("", async (request, response, next) => {
	const user = request.user
	if (!user) {
		return response.status(401).json({ error: "Token was not included in your request"})
	}

	const title = request.body.title;
	const author = request.body.author;
	const url = request.body.url;
	const likes = request.body.likes ? request.body.likes : 0;

	if (!title || !url) {
		return response.sendStatus(400);
	}

	if (!user) {
		return response.sendStatus(400);
	}

	const blog = new Blog({
		title,
		author,
		url,
		likes,
		user: user.id,
	});

	user.blogs = user.blogs.concat(blog._id);
	await user.save();
	const result = await blog.save();
	response.status(201).json(result);
});

blogsRouter.delete("/:id", async (request, response) => {
	const user = request.user
	if (!user) {
		return response.status(401).json({ error: "Token was not included in your request"})
	}

	const id = request.params.id;
	if (!id) {
		return response.sendStatus(400);
	}

	const blog = await Blog.findById(id);
	if (blog.user.toString() !== user._id.toString()) {
		return response.status(400).json({ error: "You are not allowed to delete a blog that you have not created"})
	}

	await Blog.findByIdAndDelete(id);
	response.sendStatus(204);
});

blogsRouter.put("/:id", async (request, response) => {
	const id = request.params.id;
	if (!id) {
		return response.sendStatus(400);
	}

	const body = request.body;

	await Blog.findByIdAndUpdate(id, body);
	response.sendStatus(200);
});

module.exports = blogsRouter;
