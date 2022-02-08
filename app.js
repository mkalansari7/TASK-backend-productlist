//? Imports
const express = require("express");
const app = express();
const connectDB = require("./database");
const dotenv = require("dotenv");
dotenv.config();

//? Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
	console.log(`${req.method} ${req.protocol}://${req.get("host")}${req.path}`);
	next();
});
//? Router
const productsRouter = require("./routes/products.router");
app.use("/api/products", productsRouter);

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
