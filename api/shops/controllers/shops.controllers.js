const Product = require("../../../database/models/Product");
const Shop = require("../../../database/models/Shop");

exports.fetchShop = async (shopId, next) => {
	try {
		const shop = await Shop.findById(shopId);
		// retuen shop
		if (shop) return shop;
		else {
			const err = new Error("Shop not found");
			err.status = 404;
			next(err);
		}
	} catch (error) {
		next(error);
	}
};

//? Set Controllers
exports.fetchShopsController = async (req, res, next) => {
	try {
		const shops = await Shop.find().populate({
			path: "products",
			select: ["name", "description", "color", "image", "quantity", "price"],
		});
		res.json(shops);
	} catch (err) {
		next(error);
	}
};
exports.fetchSingleShopController = async (req, res, next) => {
	try {
		const id = req.shop._id;
		const shop = await Shop.findById(id).populate({
			path: "products",
			select: ["name", "description", "color", "image", "quantity", "price"],
		});
		res.status(200).json(shop);
	} catch (error) {
		next(error);
	}
};
exports.deleteShopController = async (req, res, next) => {
	try {
		const id = req.shop._id;
		await Shop.findByIdAndDelete(id);
		res.status(204).end();
	} catch (error) {
		next(error);
	}
};
exports.addShopController = async (req, res, next) => {
	try {
		if (req.file) {
			req.body.image = `${req.protocol}://${req.get("host")}/${req.file.path}`;
		}
		const shop = req.body;
		const createdShop = await Shop.create(shop);
		res.status(200).json({ msg: "Shop Created", payload: createdShop });
	} catch (error) {
		next(error);
	}
};

exports.updateShopController = async (req, res, next) => {
	try {
		if (req.file) {
			req.body.image = `${req.protocol}://${req.get("host")}/${req.file.path}`;
		}
		const id = req.shop._id;
		const shop = req.body;
		const updatedShop = await Shop.findByIdAndUpdate(id, shop, {
			runValidators: true,
			new: true,
		});
		res.status(200).json({
			msg: "Shop Updated",
			payload: updatedShop,
		});
	} catch (error) {
		next(error);
	}
};

exports.addProductController = async (req, res, next) => {
	try {
		const { shopId } = req.params;

		if (req.file) {
			req.body.image = `${req.protocol}://${req.get("host")}/${req.file.path}`;
		}

		req.body.shop = shopId;
		const product = req.body;
		const createdProduct = await Product.create(product);
		await Shop.findByIdAndUpdate(shopId, {
			$push: { products: createdProduct._id },
		});
		res.status(200).json({ msg: "Product Created", payload: createdProduct });
	} catch (error) {
		next(error);
	}
};
