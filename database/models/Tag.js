const { Schema, model } = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");

const TagsSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		slug: String,
		products: [
			{
				type: Schema.Types.ObjectId,
				ref: "Product",
			},
		],
	},
	{
		timestamps: true,
	}
);

TagsSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });

module.exports = model("Tag", TagsSchema);
