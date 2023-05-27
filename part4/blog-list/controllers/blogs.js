const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get("", (request, response) => {
	Blog.find({}).then((blogs) => {
		response.json(blogs);
	});
});

blogsRouter.post("", (request, response) => {
    const title = request.body.title;
    const author = request.body.author;
    const url = request.body.url;
    const likes = request.body.likes ? request.body.likes : 0;

    if (!title || !url) {
        return response.sendStatus(400);
    }

	const blog = new Blog({
        title,
        author,
        url,
        likes
    });

	blog.save().then((result) => {
		response.status(201).json(result);
	});
});


module.exports = blogsRouter