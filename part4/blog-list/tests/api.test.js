const { default: mongoose } = require("mongoose");
const app = require("../app");
const supertest = require("supertest");
const Blog = require("../models/blog");
const helper = require("./test_helper");
const User = require("../models/user");
const api = supertest(app);

beforeEach(async () => {
	await Blog.deleteMany({});
	await User.deleteMany({});

	const blogs = helper.initialBlogs
		.map((blog) => new Blog(blog))
		.map((blog) => blog.save());
	await Promise.all(blogs);
});

test("Ensure GET returns all the saved blogs", async () => {
	const { body } = await api
		.get("/api/blogs")
		.expect(200)
		.expect("Content-Type", /application\/json/);
	expect(body.length).toBe(helper.initialBlogs.length);
});

test("Ensure saved blogs contain the 'id' property", async () => {
	const { body } = await api
		.get("/api/blogs")
		.expect(200)
		.expect("Content-Type", /application\/json/);
	for (const blog of body) {
		expect(blog.id).toBeDefined();
	}
});

test("Ensure POST saves a new blog", async () => {
	const token = await helper.saveUserAndGetToken();

	const blog = {
		title: "This is a Sample Blog",
		author: "Jaime Ayala",
		url: "http://google.com/",
		likes: 5,
	};

	await api
		.post("/api/blogs")
		.set("authorization", `Bearer ${token}`)
		.send(blog)
		.expect(201);

	const { body } = await api
		.get("/api/blogs")
		.expect(200)
		.expect("Content-Type", /application\/json/);

	expect(body.length).toBe(helper.initialBlogs.length + 1);
	const titles = body.map((blog) => blog.title);
	expect(titles).toContain("This is a Sample Blog");
});

test("Ensure POST does not save a new blog if invalid token is provided", async () => {
	const blog = {
		title: "This is a Sample Blog",
		author: "Jaime Ayala",
		url: "http://google.com/",
		likes: 5,
	};

	await api
		.post("/api/blogs")
		.send(blog)
		.expect(401);

	const { body } = await api
		.get("/api/blogs")
		.expect(200)
		.expect("Content-Type", /application\/json/);

	expect(body.length).toBe(helper.initialBlogs.length);
});

test("Ensure POST saves a new blog with zero likes if that propery is missing", async () => {
	const token = await helper.saveUserAndGetToken();

	const blog = {
		title: "This is a Sample Blog",
		author: "Jaime Ayala",
		url: "http://google.com/",
	};

	await api
		.post("/api/blogs")
		.set("authorization", `Bearer ${token}`)
		.send(blog)
		.expect(201);

	const { body } = await api
		.get("/api/blogs")
		.expect(200)
		.expect("Content-Type", /application\/json/);

	let likes = -1;
	for (const savedBlog of body) {
		if (blog.title === savedBlog.title) {
			likes = savedBlog.likes;
			break;
		}
	}
	expect(likes).toBe(0);
});

test("Ensure POST does not save a new blog if title propery is missing", async () => {
	const token = await helper.saveUserAndGetToken();

	const blog = {
		author: "Jaime Ayala",
		url: "http://google.com/",
	};

	await api
		.post("/api/blogs")
		.set("authorization", `Bearer ${token}`)
		.send(blog)
		.expect(400);

	const { body } = await api
		.get("/api/blogs")
		.expect(200)
		.expect("Content-Type", /application\/json/);

	expect(body.length).toBe(helper.initialBlogs.length);
});

test("Ensure POST does not save a new blog if url propery is missing", async () => {
	const token = await helper.saveUserAndGetToken();

	const blog = {
		title: "This is a Sample Blog",
		author: "Jaime Ayala",
	};

	await api
		.post("/api/blogs")
		.set("authorization", `Bearer ${token}`)
		.send(blog)
		.expect(400);

	const { body } = await api
		.get("/api/blogs")
		.expect(200)
		.expect("Content-Type", /application\/json/);

	expect(body.length).toBe(helper.initialBlogs.length);
});

test("Ensure DELETE removes a blog", async () => {
	const token = await helper.saveUserAndGetToken();

	const blog = {
		title: "This is a Sample Blog",
		author: "Jaime Ayala",
		url: "http://google.com/",
		likes: 5,
	};

	await api
		.post("/api/blogs")
		.set("authorization", `Bearer ${token}`)
		.send(blog)
		.expect(201);

	const { body: bodyWithNewNote } = await api
		.get("/api/blogs")
		.expect(200)
		.expect("Content-Type", /application\/json/);

	expect(bodyWithNewNote.length).toBe(helper.initialBlogs.length + 1);
	const savedId = bodyWithNewNote.filter(
		(savedBlog) => savedBlog.title === blog.title
	)[0].id;

	await api
		.delete(`/api/blogs/${savedId}`)
		.set("authorization", `Bearer ${token}`)
		.expect(204);
	const { body: bodyWithNoteDeleted } = await api
		.get("/api/blogs")
		.expect(200)
		.expect("Content-Type", /application\/json/);

	expect(bodyWithNoteDeleted.length).toBe(helper.initialBlogs.length);
});

test("Ensure PUT updates an existing blog", async () => {
	const token = await helper.saveUserAndGetToken();

	const blog = {
		title: "This is a Sample Blog",
		author: "Jaime Ayala",
		url: "http://google.com/",
		likes: 5,
	};

	await api
		.post("/api/blogs")
		.set("authorization", `Bearer ${token}`)
		.send(blog)
		.expect(201);

	const { body: bodyWithNewNote } = await api
		.get("/api/blogs")
		.expect(200)
		.expect("Content-Type", /application\/json/);

	expect(bodyWithNewNote.length).toBe(helper.initialBlogs.length + 1);
	const savedId = bodyWithNewNote.filter(
		(savedBlog) => savedBlog.title === blog.title
	)[0].id;

	const updatedBlog = {
		title: "Sample Blog",
		author: "Jaime",
		url: "http://google.com.mx/",
		likes: 22,
	};

	await api.put(`/api/blogs/${savedId}`).send(updatedBlog).expect(200);

	const { body: bodyWithUpdatedNote } = await api
		.get("/api/blogs")
		.expect(200)
		.expect("Content-Type", /application\/json/);

	expect(bodyWithUpdatedNote.map((savedBlog) => savedBlog.title)).toContain(
		updatedBlog.title
	);
	expect(bodyWithUpdatedNote.map((savedBlog) => savedBlog.likes)).toContain(
		updatedBlog.likes
	);
	expect(bodyWithUpdatedNote.map((savedBlog) => savedBlog.author)).toContain(
		updatedBlog.author
	);
	expect(bodyWithUpdatedNote.map((savedBlog) => savedBlog.url)).toContain(
		updatedBlog.url
	);
});

afterAll(async () => {
	await mongoose.connection.close();
});
