const Order = require("../../database/models/Order");

exports.checkout = async (req, res, next) => {
  try {
    const order = req.body;
    console.log(order);
    const createdOrder = await Order.create(order);

    res.status(200).json({ msg: "Order Created", payload: createdOrder });
  } catch (error) {
    next(error);
  }
};

exports.fetchOrdersController = async (req, res, next) => {
  try {
    const orders = await Order.find().populate({
      path: "products",
      populate: {
        path: "product",
        model: "Product",
      },
    });
    res.json(orders);
  } catch (err) {
    next(error);
  }
};
