const { default: mongoose } = require("mongoose");
const app = require("../app");
const supertest = require("supertest");
const Blog = require("../models/blog");
const helper = require("./test_helper");
const api = supertest(app);

beforeEach(async () => {
	await Blog.deleteMany({});

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
	const blog = {
		title: "This is a Sample Blog",
		author: "Jaime Ayala",
		url: "http://google.com/",
		likes: 5,
	};

	await api.post("/api/blogs").send(blog).expect(201);

	const { body } = await api
		.get("/api/blogs")
		.expect(200)
		.expect("Content-Type", /application\/json/);
    
	expect(body.length).toBe(helper.initialBlogs.length + 1);
    const titles = body.map(blog => blog.title)
	expect(titles).toContain("This is a Sample Blog");
});

test("Ensure POST saves a new blog with zero likes if that propery is missing", async () => {
	const blog = {
		title: "This is a Sample Blog",
		author: "Jaime Ayala",
		url: "http://google.com/",
	};

	await api.post("/api/blogs").send(blog).expect(201);

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
	const blog = {
		author: "Jaime Ayala",
        url: "http://google.com/",
	};

	await api.post("/api/blogs").send(blog).expect(400);

	const { body } = await api
		.get("/api/blogs")
		.expect(200)
		.expect("Content-Type", /application\/json/);

    expect(body.length).toBe(helper.initialBlogs.length);
});

test("Ensure POST does not save a new blog if url propery is missing", async () => {
	const blog = {
		title: "This is a Sample Blog",
		author: "Jaime Ayala",
	};

	await api.post("/api/blogs").send(blog).expect(400);

	const { body } = await api
		.get("/api/blogs")
		.expect(200)
		.expect("Content-Type", /application\/json/);

    expect(body.length).toBe(helper.initialBlogs.length);
});

afterAll(async () => {
	await mongoose.connection.close();
});
