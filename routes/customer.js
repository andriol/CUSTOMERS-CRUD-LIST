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

router.route("/").put((req, res) => {
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
          res.json(updatedCustomer);
        })
        .catch((err) => res.send("error with the update"));
    })

    .catch((err) => res.send("Error updating customers data"));
});

//router.get("/", customersController.list);
//router.post("/add", customersController.save);
//router.get("/update/:id", customersController.edit);
//router.post("/update/:id", customersController.update);
//router.get("/delete/:id", customersController.delete);

module.exports = router;
