exports.up = (knex) => {
  return knex.schema.createTable("charities", (charitiesTable) => {
    charitiesTable.string("charity_name").primary();
    charitiesTable.string("charity_logo").notNullable();
    charitiesTable.string("charity_description", 750).notNullable();
    charitiesTable.string("justgiving_link").notNullable();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable("charities");
};
