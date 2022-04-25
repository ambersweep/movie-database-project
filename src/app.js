if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const moviesRouter = require("./movies/movies.router")
const theatersRouter = require("./theaters/theaters.router")
const reviewsRouter = require("./reviews/reviews.router")
const cors = require('cors')

app.use(express.json())
app.use(cors())

app.use("/movies", moviesRouter)
app.use("/reviews", reviewsRouter)
app.use("/theaters", theatersRouter)


//error handler
const errorHandler = require("./errors/errorHandler")
//not found handler
const notFound = require("./errors/notFound")

module.exports = app;
