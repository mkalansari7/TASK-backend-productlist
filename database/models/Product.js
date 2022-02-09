const { Schema, model } = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");

const ProductSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		slug: String,
		image: {
			type: String,
			required: true,
		},
		description: String,
		color: String,
		quantity: {
			type: Number,
			min: 0,
		},
		price: {
			type: Number,
			default: 10,
		},
		shop: {
			type: Schema.Types.ObjectId,
			ref: "Shop",
		},
	},
	{
		timestamps: true,
	}
);

ProductSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });

module.exports = model("Product", ProductSchema);
