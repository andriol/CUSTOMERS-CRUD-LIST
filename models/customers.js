const bookshelf = require("../bookshelf");

const customer = bookshelf.model("customer", {
  tableName: "customers",
});

module.exports = customer;
