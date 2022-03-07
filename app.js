//? Imports
const express = require("express");
const connectDB = require("./database");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const passport = require("passport");
const { localStrategy } = require("./middleware/passport");
dotenv.config();

const app = express();
app.use(cors());

//? Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
passport.use(localStrategy);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.protocol}://${req.get("host")}${req.path}`);
  next();
});

//? Router
const productsRouter = require("./api/products/products.router");
app.use("/api/products", productsRouter);

const shopsRouter = require("./api/shops/shops.router");
app.use("/api/shops", shopsRouter);

const tagsRouter = require("./api/tags/tags.router");
app.use("/api/tags", tagsRouter);

const usersRouter = require("./api/users/users.router");
app.use("/api", usersRouter);

const ordersRouter = require("./api/orders/orders.router");
app.use("/api", ordersRouter);

app.use("/media", express.static(path.join(__dirname, "media")));

//? Error handler Middleware
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ msg: err.message || "Internal Server Error" });
  next();
});

//? Not Found Middleware
app.use((req, res, next) => {
  res.status(404).json({ msg: "Path Not Found" });
});

//? PORT and Listen
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`The application is running on ${PORT}`);
  connectDB();
});
