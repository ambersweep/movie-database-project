
exports.up = function(knex) {
  return knex.schema.createTable("reviews", (table)=> {
      table.increments("review_id").primary()
      table.text("content")
      table.score("")
  })
};

exports.down = function(knex) {
  
};
