const Product = require("../database/models/Product");

exports.fetchProduct = async (productId, next) => {
	try {
		const product = await Product.findById(productId);
		// retuen product
		if (product) return product;
		else {
			const err = new Error("Product not found");
			err.status = 404;
			next(err);
		}
	} catch (error) {
		next(error);
	}
};

//? Set Controllers
exports.fetchProductsController = async (req, res, next) => {
	try {
		const products = await Product.find();
		res.json(products);
	} catch (err) {
		next(error);
	}
};
exports.fetchSingleProductController = async (req, res, next) => {
	try {
		const id = req.product._id;
		const product = await Product.findById(id);
		res.status(200).json(product);
	} catch (error) {
		next(error);
	}
};
exports.deleteProductController = async (req, res, next) => {
	try {
		const id = req.product._id;
		await Product.findByIdAndDelete(id);
		res.status(204).end();
	} catch (error) {
		next(error);
	}
};
exports.addProductController = async (req, res, next) => {
	try {
		if (req.file) {
			req.body.image = `${req.protocol}://${req.get("host")}/${req.file.path}`;
		}
		const product = req.body;
		const createdProduct = await Product.create(product);
		res.status(200).json({ msg: "Product Created", payload: createdProduct });
	} catch (error) {
		next(error);
	}
};

exports.updateProductController = async (req, res, next) => {
	try {
		if (req.file) {
			req.body.image = `${req.protocol}://${req.get("host")}/${req.file.path}`;
		}
		const id = req.product._id;
		const product = req.body;
		const updatedProduct = await Product.findByIdAndUpdate(id, product, {
			runValidators: true,
			new: true,
		});
		res.status(200).json({
			msg: "Product Updated",
			payload: updatedProduct,
		});
	} catch (error) {
		next(error);
	}
};
