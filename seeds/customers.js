exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("customers")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("customers").insert([
        { id: 1, name: "Andy", address: "100 Main Street", phone: "123456789" },
        { id: 2, name: "Iris", address: "11 Main Road", phone: "987654321" },
      ]);
    });
};
