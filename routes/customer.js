//const router = require("express").Router();
const customer = require("../models/customers");
const express = require("express");
const router = express.Router();
const { v4: uuid4 } = require("uuid");

router.route("/").get((req, res) => {
  customer
    .where({ ...req.query })
    .fetchAll({
      columns: ["id", "address", "name", "phone"],
    })

    .then((customers) => {
      res.status(200).json(customers);

      console.log(customers);
    })

    .catch(() =>
      res.status(400).json({ message: "Error can't get customers" })
    );
});

router.route("/:id").get((req, res) => {
  customer
    .where({ id: req.params.id })
    .fetch()
    .then((customers) => {
      res.json(customers);
    })
    .catch((err) => res.send("Error getting customers data"));
});

router.route("/").post((req, res) => {
  const newCustomer = new customer({
    //id: uuid4(),
    name: req.body.name,
    address: req.body.address,
    phone: req.body.phone,
  });
  newCustomer
    .save()
    .then((newCustomer) => {
      res.status(201).json(newCustomer);
    })

    .catch(() =>
      res.status(400).json({ message: "Error, can't create customer" })
    );
  console.log(req.body);
});

router.route("/:id").put((req, res) => {
  customer
    .where({ id: req.params.id })
    .fetch()
    .then((customers) => {
      customers
        .save({
          name: req.body.name,
          address: req.body.address,
          phone: req.body.phone,
        })
        .then((updatedCustomer) => {
          console.log(updatedCustomer);
          res.json(updatedCustomer);
        })
        .catch((err) => res.send("error with the update"));
    })

    .catch((err) => res.send("Error updating customers data"));
});

router.route("/:id").delete((req, res) => {
  customer
    .where({ id: req.params.id })
    .destroy()
    .then(() => {
      res
        .status(200)
        .json({ message: `customer ${req.params.id} deleted successfully` });
    })
    .catch(() =>
      res
        .status(400)
        .json({ message: `Error, can't delete customer ${req.params.id}` })
    );
});

module.exports = router;
