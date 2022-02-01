//? Express
const express = require("express");
//? Import Controllers
const {
	fetchProductsController,
	fetchSingleProductController,
	deleteProductController,
	addProductController,
} = require("../controllers/products.controllers");
//? Set Router
const productsRouter = express.Router();
//? Assign Router to Controllers
productsRouter.get("/", fetchProductsController);
productsRouter.get("/:slug", fetchSingleProductController);
productsRouter.delete("/:slug", deleteProductController);
productsRouter.post("/", addProductController);
//? Export Router
module.exports = productsRouter;
