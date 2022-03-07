const express = require("express");
const { checkout, fetchOrdersController } = require("./orders.controllers");

const ordersRouter = express.Router();

ordersRouter.post("/checkout", checkout);
ordersRouter.get("/", fetchOrdersController);

module.exports = ordersRouter;
