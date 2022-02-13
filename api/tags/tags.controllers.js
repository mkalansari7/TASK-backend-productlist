// const Product = require("../../../database/models/Product");
const Tag = require("../../database/models/Tag");

exports.fetchTag = async (tagId, next) => {
	try {
		const tag = await Tag.findById(tagId);
		// retuen tag
		if (tag) return tag;
		else {
			const err = new Error("Tag not found");
			err.status = 404;
			next(err);
		}
	} catch (error) {
		next(error);
	}
};

//? Set Controllers
exports.fetchTagsController = async (req, res, next) => {
	try {
		const tags = await Tag.find().populate({
			path: "products",
			select: ["name", "description", "color", "image", "quantity", "price"],
		});
		res.json(tags);
	} catch (err) {
		next(err);
	}
};
exports.fetchSingleTagController = async (req, res, next) => {
	try {
		const id = req.tag._id;
		const tag = await Tag.findById(id).populate({
			path: "products",
			select: ["name", "description", "color", "image", "quantity", "price"],
		});
		res.status(200).json(tag);
	} catch (error) {
		next(error);
	}
};
exports.deleteTagController = async (req, res, next) => {
	try {
		const id = req.tag._id;
		await Tag.findByIdAndDelete(id);
		res.status(204).end();
	} catch (error) {
		next(error);
	}
};
exports.addTagController = async (req, res, next) => {
	try {
		if (req.file) {
			req.body.image = `${req.protocol}://${req.get("host")}/${req.file.path}`;
		}
		const tag = req.body;
		const createdTag = await Tag.create(tag);
		res.status(200).json({ msg: "Tag Created", payload: createdTag });
	} catch (error) {
		next(error);
	}
};

exports.updateTagController = async (req, res, next) => {
	try {
		if (req.file) {
			req.body.image = `${req.protocol}://${req.get("host")}/${req.file.path}`;
		}
		const id = req.tag._id;
		const tag = req.body;
		const updatedTag = await Shop.findByIdAndUpdate(id, tag, {
			runValidators: true,
			new: true,
		});
		res.status(200).json({
			msg: "Tag Updated",
			payload: updatedTag,
		});
	} catch (error) {
		next(error);
	}
};
