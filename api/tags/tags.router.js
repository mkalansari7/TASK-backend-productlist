//? Express
const express = require("express");
//? Import Controllers
const {
	fetchTagsController,
	deleteTagController,
	fetchSingleTagController,
	addTagController,
	updateTagController,
} = require("./tags.controllers");
const upload = require("../../middleware/multer");

//? Set Router
const tagsRouter = express.Router();

//? Params Middleware
tagsRouter.param("tagId", async (req, res, next, tagId) => {
	const shop = await fetchShop(tagId, next);
	req.shop = shop;
	// if (shop) req.tag = tag;
	// else {
	// 	const err = new Error("Tag not found");
	// 	err.status = 404;
	// 	next(err);
	// }
	next();
});

//? Assign Router to Controllers
tagsRouter.get("/", fetchTagsController);
tagsRouter.delete("/:tagId", deleteTagController);
tagsRouter.get("/:tagId", fetchSingleTagController);
tagsRouter.post("/", upload.single("image"), addTagController);
tagsRouter.put("/:tagId", upload.single("image"), updateTagController);
//? Export Router
module.exports = tagsRouter;
