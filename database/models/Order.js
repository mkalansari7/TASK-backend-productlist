const { Schema, model } = require("mongoose");

const OrderSchema = new Schema({
  buyer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        min: 1,
      },
    },
  ],
});

module.exports = model("Order", OrderSchema);
