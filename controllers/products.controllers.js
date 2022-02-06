//? Import Data
// const productsData = require("../data/data");

//? Set Data

const Product = require("../database/models/Product");

//? Set Controllers
exports.fetchProductsController = async (req, res) => {
	try {
		const products = await Product.find();
		res.json(products);
	} catch (err) {
		res.status(500).json({ msg: error.message });
	}
};
exports.fetchSingleProductController = async (req, res) => {
	const { slug } = req.params;
	try {
		const product = await Product.findOne({ slug: slug });
		if (product) {
			res.status(200).json({ msg: product });
		} else {
			res.status(404).send("Product not found");
		}
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
};
exports.deleteProductController = async (req, res) => {
	const { productId } = req.params;
	try {
		const deletedProduct = await Product.findByIdAndDelete(productId);
		if (deletedProduct) {
			res.status(204).end();
		} else {
			res.status(404).json({ msg: "Product Not Found" });
		}
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
};
exports.addProductController = async (req, res) => {
	const product = req.body;
	try {
		const createdProduct = await Product.create(product);
		res.status(200).json({ msg: "Product Created", payload: createdProduct });
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
};

exports.updateProductController = async (req, res) => {
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
			res.status(404).json({ msg: "Product Not Found" });
		}
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
};
