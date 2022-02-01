const express = require("express");
const products = require("./data/data");
const app = express();

const PORT = 8000;
app.listen(PORT, () => {
	console.log(`The application is running on ${PORT}`);

	app.get("/api/products", (req, res) => {
		res.json(products);
	});
});
