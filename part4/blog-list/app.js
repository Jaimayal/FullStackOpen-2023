const config = require("./utils/config") 
const mongoose = require("mongoose");
const cors = require("cors")
const express = require("express")
const app = express()
const logger = require("./utils/logger");
const blogsRouter = require("./controllers/blogs");

app.use(cors());
app.use(express.json());

mongoose
    .connect(config.MONGODB_URI)
    .then(() => logger.info("The connection with MongoDB was successful"))
    .catch(error => logger.error("Some error occurred while conneting to MongoDB", error.message));

app.use("/api/blogs", blogsRouter)

module.exports = app