const bookshelf = require("../bookshelf");

const Customers = bookshelf.model("Customers", {
  tableName: "customers",
});

module.exports = Customers;
