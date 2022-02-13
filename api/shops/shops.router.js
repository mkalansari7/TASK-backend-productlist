//? Express
const express = require("express");
//? Import Controllers
const {
	fetchShopsController,
	fetchSingleShopController,
	deleteShopController,
	addShopController,
	updateShopController,
	fetchShop,
	addProductController,
} = require("./shops.controllers");
const upload = require("../../middleware/multer");

//? Set Router
const shopsRouter = express.Router();

//? Params Middleware
shopsRouter.param("shopId", async (req, res, next, shopId) => {
	const shop = await fetchShop(shopId, next);
	req.shop = shop;
	// if (shop) req.shop = shop;
	// else {
	// 	const err = new Error("Shop not found");
	// 	err.status = 404;
	// 	next(err);
	// }
	next();
});

//? Assign Router to Controllers
shopsRouter.get("/", fetchShopsController);
shopsRouter.delete("/:shopId", deleteShopController);
shopsRouter.get("/:shopId", fetchSingleShopController);
shopsRouter.post("/", upload.single("image"), addShopController);
shopsRouter.put("/:shopId", upload.single("image"), updateShopController);
shopsRouter.post(
	"/:shopId/products",
	upload.single("image"),
	addProductController
);
//? Export Router
module.exports = shopsRouter;
