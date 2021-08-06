exports.up = function (knex) {
  return knex.schema.createTable("customers", (table) => {
    table.increments("id").primary().unsigned().notNullable();
    table.string("name", 50).notNullable();
    table.string("address", 100).notNullable();
    table.integer("phone", 15);
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("customers");
};
