//? Imports
const express = require("express");
const connectDB = require("./database");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
dotenv.config();

const app = express();
app.use(cors());

//? Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
	console.log(`${req.method} ${req.protocol}://${req.get("host")}${req.path}`);
	next();
});

//? Router
const productsRouter = require("./api/products/routes/products.router");
app.use("/api/products", productsRouter);

const shopsRouter = require("./api/shops/routes/shops.router");
app.use("/api/shops", shopsRouter);

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
