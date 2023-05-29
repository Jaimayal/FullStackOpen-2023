const config = require("./utils/config") 
const mongoose = require("mongoose");
const cors = require("cors")
const express = require("express")
const app = express()
const logger = require("./utils/logger");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const middleware = require("./utils/errorHandler");
const loginRouter = require("./controllers/auth");

app.use(cors());
app.use(express.json());
app.use(middleware.tokenExtractor);

mongoose
    .connect(config.MONGODB_URI)
    .then(() => logger.info("The connection with MongoDB was successful"))
    .catch(error => logger.error("Some error occurred while conneting to MongoDB", error.message));

app.use("/api/blogs", middleware.userExtractor, blogsRouter)
app.use("/api/users", usersRouter)
app.use("/api/auth", loginRouter)

app.use(middleware.errorHandler);
module.exports = app