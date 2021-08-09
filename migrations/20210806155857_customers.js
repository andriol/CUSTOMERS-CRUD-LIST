exports.up = function (knex) {
  return knex.schema.createTable("customers", (table) => {
    table.increments("id").notNullable();
    table.string("name");
    table.string("address");
    table.string("phone");
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("customers");
};
