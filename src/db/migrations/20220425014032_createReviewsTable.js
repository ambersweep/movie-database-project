// The `reviews` table represents a review done by a critic of a single movie.
//  It references both a critic and a movie.

exports.up = function (knex) {
  return knex.schema.createTable("reviews", (table) => {
    table.increments("review_id").primary();
    table.text("content");
    table.integer("score");
    table.integer("critic_id").unsigned().notNullable(); // brings critic_id in as foreign key
    table
      .foreign("critic_id")
      .references("critic_id")
      .inTable("critics")
      .onDelete("cascade");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("reviews");
};
