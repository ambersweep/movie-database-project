const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

// maps out critic details to add to updated review
const addCritic = mapProperties({
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

function list() {
  return knex("movies").select("*");
}

function listMoviesCurrentlyShowing() {
  return knex("movies")
    .join("movies_theaters", "movies.movie_id", "movies_theaters.movie_id")
    .select("movies.*", "movies_theaters.is_showing")
    .groupBy("movies.movie_id")
    .where({ is_showing: true });
}

function read(movieId) {
  return knex("movies").select("*").where({ movie_id: movieId }).first();
}

function readTheaters(movieId) {
  return knex("movies as m")
    .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
    .join("theaters as t", "t.theater_id", "mt.theater_id")
    .select("t.*")
    .where({ "m.movie_id": movieId });
}

function readReviews(movieId) {
  return knex("movies as m")
    .join("reviews as r", "r.movie_id", "m.movie_id")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .where({ "m.movie_id": movieId })
    .select("*")
    .then((reviews) => reviews.map(addCritic));
}

module.exports = {
  list,
  listMoviesCurrentlyShowing,
  read,
  readTheaters,
  readReviews,
};
