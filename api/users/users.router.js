//? Express
const express = require("express");
const passport = require("passport");
const { signup, signin } = require("./users.controllers");

//? Import Controllers

//? Set Router
const usersRouter = express.Router();

//? Assign Router to Controllers
usersRouter.post("/signup", signup);
usersRouter.post(
	"/signin",
	passport.authenticate("local", { session: false }),
	signin
);

//? Export Router
module.exports = usersRouter;
