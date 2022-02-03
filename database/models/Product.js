const { Schema, model } = require("mongoose");

const ProductSchema = new Schema(
	{
		name: String,
		slug: String,
		image: String,
		description: String,
		color: String,
		quantity: Number,
		price: Number,
	},
	{
		timestamps: true,
	}
);

module.exports = model("Product", ProductSchema);
