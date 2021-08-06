const customersData = require("../seed_data/customers");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("customers")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("customers").insert(customersData);
    });
};
