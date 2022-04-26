if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const moviesRouter = require("./movies/movies.router");
const theatersRouter = require("./theaters/theaters.router");
const reviewsRouter = require("./reviews/reviews.router");
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.use("/movies", moviesRouter);
app.use("/theaters", theatersRouter);
app.use("/reviews", reviewsRouter);

//Not Found Handler
const notFound = require("./errors/notFound");
app.use(notFound);

//Error Handler
const errorHandler = require("./errors/errorHandler");
app.use(errorHandler);

module.exports = app;
