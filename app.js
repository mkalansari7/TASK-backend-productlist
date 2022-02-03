// const password = gy5lGfcYhiqigTqN;
//? Import Express
const express = require("express");
const connectDB = require("./database");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

//? Use Middle-ware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//? Import Router
const productsRouter = require("./routes/products.router");
//? Use Controller
app.use("/api/products", productsRouter);
//? Listen PORT
const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`The application is running on ${PORT}`);
	connectDB();
});
