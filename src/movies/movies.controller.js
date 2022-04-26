const service = require("./movies.service");

const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// Validation - Movie Exists
async function movieExists(req, res, next) {
  const { movieId } = req.params;
  const movie = await service.read(movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  } else {
    next({ status: 404, message: "Movie cannot be found." });
  }
}

async function list(req, res) {
  let movies;
  // query for if movie is currently showing
  if (req.query.is_showing) {
    movies = await service.listMoviesCurrentlyShowing();
  } else {
    movies = await service.list();
  }
  res.json({ data: movies });
}

async function read(req, res) {
  res.json({ data: res.locals.movie });
}

async function readTheaters(req, res) {
  const { movieId } = req.params;
  const data = await service.readTheaters(movieId);
  res.json({ data });
}

async function readReviews(req, res) {
  const { movieId } = req.params;
  const data = await service.readReviews(movieId);
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  movieExists: asyncErrorBoundary(movieExists),
  read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
  readTheaters: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(readTheaters),
  ],
  readReviews: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(readReviews),
  ],
};
