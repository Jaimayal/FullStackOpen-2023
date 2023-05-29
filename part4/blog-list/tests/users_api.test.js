const { default: mongoose } = require("mongoose");
const app = require("../app");
const supertest = require("supertest");
const User = require("../models/user");
const helper = require("./test_helper");
const api = supertest(app);

beforeEach(async () => {
    await User.deleteMany({});
});

test("Given valid users, then POST /api/users succeeds with a new user", async () => {
	await api
		.post("/api/users")
		.send({
			username: "test",
			password: "test",
			name: "test",
		})
		.expect(201)
		.expect("Content-Type", /application\/json/);

    const usersAtEnd = await api.get("/api/users");

    expect(usersAtEnd.body).toHaveLength(1);
});

test("Given invalid user without username, then POST /api/users returns 400", async () => {
    const invalidUser = {
        password: "test",
        name: "test",
    }

	await api
		.post("/api/users")
		.send(invalidUser)
		.expect(400)
		.expect("Content-Type", /application\/json/);

    const usersAtEnd = await api.get("/api/users");

    expect(usersAtEnd.body).toHaveLength(0);
});

test("Given invalid user without valid password, then POST /api/users returns 400", async () => {
	await api
		.post("/api/users")
		.send({
			username: "test",
            password: "12",
			name: "test",
		})
		.expect(400)
		.expect("Content-Type", /application\/json/);

    const usersAtEnd = await api.get("/api/users");

    expect(usersAtEnd.body).toHaveLength(0);
});

test("Given already existant user, then POST /api/users returns 400", async () => {
	await api
		.post("/api/users")
		.send({
			username: "test",
            password: "1234",
			name: "test",
		})
		.expect(201)
		.expect("Content-Type", /application\/json/);

    await api
		.post("/api/users")
		.send({
			username: "test",
            password: "1234",
			name: "test",
		})
		.expect(400)
		.expect("Content-Type", /application\/json/);

    const usersAtEnd = await api.get("/api/users");
    expect(usersAtEnd.body).toHaveLength(1);
});


afterAll(async () => {
	await mongoose.connection.close();
});