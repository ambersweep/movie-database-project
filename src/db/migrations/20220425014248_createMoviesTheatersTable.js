// The `movies` table represents movies stored in the application database.
// Each movie has the following fields:

exports.up = function (knex) {
  return knex.schema.createTable("movies_theaters", (table) => {
    table.integer("movie_id").unsigned().notNullable();
    table
      .foreign("movie_id")
      .references("movie_id")
      .inTable("movies")
      .onDelete("CASCADE");
    table.integer("theater_id").unsigned().notNullable();
    table
      .foreign("theater_id")
      .references("theater_id")
      .inTable("theaters")
      .onDelete("CASCADE");
    table.boolean("is_showing").defaultTo(false).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("movies_theaters");
};
