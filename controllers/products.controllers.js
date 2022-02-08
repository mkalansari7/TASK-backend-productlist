const Product = require("../database/models/Product");

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
	const { slug } = req.params;
	try {
		const product = await Product.findOne({ slug: slug });
		if (product) {
			res.status(200).json({ msg: product });
		} else {
			const err = new Error("Product not found");
			err.status = 404;
			next(err);
		}
	} catch (error) {
		next(error);
	}
};
exports.deleteProductController = async (req, res, next) => {
	const { productId } = req.params;
	try {
		const deletedProduct = await Product.findByIdAndDelete(productId);
		if (deletedProduct) {
			res.status(204).end();
		} else {
			const err = new Error("Product not found");
			err.status = 404;
			next(err);
		}
	} catch (error) {
		next(error);
	}
};
exports.addProductController = async (req, res, next) => {
	const product = req.body;
	try {
		const createdProduct = await Product.create(product);
		res.status(200).json({ msg: "Product Created", payload: createdProduct });
	} catch (error) {
		next(error);
	}
};

exports.updateProductController = async (req, res, next) => {
	const { productId } = req.params;
	const product = req.body;
	try {
		const updatedProduct = await Product.findByIdAndUpdate(productId, product, {
			runValidators: true,
			new: true,
		});
		if (updatedProduct) {
			res.status(200).json({
				msg: "Product Updated",
				payload: updatedProduct,
			});
		} else {
			const err = new Error("Product not found");
			err.status = 404;
			next(err);
		}
	} catch (error) {
		next(error);
	}
};
