//? Express
const express = require("express");
//? Import Controllers
const {
	fetchProductsController,
	fetchSingleProductController,
	deleteProductController,
	addProductController,
	updateProductController,
} = require("../controllers/products.controllers");
//? Set Router
const productsRouter = express.Router();
//? Assign Router to Controllers
productsRouter.get("/", fetchProductsController);
productsRouter.get("/:slug", fetchSingleProductController);
productsRouter.delete("/:productId", deleteProductController);
productsRouter.post("/", addProductController);
productsRouter.put("/:productId", updateProductController);
//? Export Router
module.exports = productsRouter;
