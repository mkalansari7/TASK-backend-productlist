//? Import Express
const express = require("express");
const app = express();
//? Use Middle-ware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//? Import Router
const productsRouter = require("./routes/products.router");
//? Use Controller
app.use("/api/products", productsRouter);
//? Listen PORT 
const PORT = 8000;
app.listen(PORT, () => {
	console.log(`The application is running on ${PORT}`);
});
