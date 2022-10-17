exports.up = knex => knex.schema.createTable("links", table => {
  table.increments("id");
  table.text("url").notNullable(); //não permite null.

  table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE"); 
  table.timestamp("created_at").default(knex.fn.now());
}); 

exports.down = knex => knex.schema.dropTable("links"); //método de deletar a tabela