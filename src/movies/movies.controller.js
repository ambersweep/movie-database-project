const moviesService = require("./movies.service");

const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// Validation - Movie Exists
async function movieExists(req, res, next) {
  const movie = await moviesService.read(req.params.movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: `Movie cannot be found.` });
}

async function list(req, res) {
  let movies;
   // query for if movie is currently showing
  if (req.query.is_showing) {
    movies = await service.list();
  } else {
    movies = await service.list();
  }
  res.json({ data: movies });
}

function read(req, res) {
  res.json({ data: res.locals.movie });
}

module.exports = {
  list: asyncErrorBoundary(list),
  movieExists: asyncErrorBoundary(movieExists),
  read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
};
