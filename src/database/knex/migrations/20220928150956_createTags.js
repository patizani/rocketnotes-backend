exports.up = knex => knex.schema.createTable("tags", table => {
  table.increments("id");
  table.text("name").notNullable(); //não permite null.

  table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE"); //Se a nota for deletada, automaticamente a tag vinculada tb será deletada.
  table.integer("user_id").references("id").inTable("users");

}); 

exports.down = knex => knex.schema.dropTable("tags"); //método de deletar a tabela