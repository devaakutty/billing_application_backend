const express = require("express");

const {createCustomer, getCustomer, getCustomerById} = require("../controller/customerController");

const  router = express.Router();

//create Customer
router.post("/create",createCustomer);

//Get Customer
router.get("/", getCustomer);

//Get Single Customer By Id
router.get("/:id",getCustomerById);

module.exports = router;