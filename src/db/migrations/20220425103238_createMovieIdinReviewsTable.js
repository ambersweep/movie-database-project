
exports.up = function(knex) {
  return knex.schema.table("reviews", (table)=> {
    table.integer("movie_id").unsigned().notNullable();
    table
      .foreign("movie_id")
      .references("movie_id")
      .inTable("movies")
      .onDelete("cascade");
  })
};

exports.down = function(knex) {
  
};
