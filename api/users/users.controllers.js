const User = require("../../database/models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { keys } = require("../../config/keys");

exports.signup = async (req, res, next) => {
  try {
    const { password } = req.body;
    const saltRounds = 10;
    req.body.password = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create(req.body);

    const payload = {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      exp: Date.now() + keys.JWT_EXPIRATION_MS,
    };

    const token = jwt.sign(JSON.stringify(payload), keys.JWT_SECRET);

    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.signin = (req, res, next) => {
  const user = req.user;

  const payload = {
    _id: user._id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    exp: Date.now() + keys.JWT_EXPIRATION_MS,
  };

  const token = jwt.sign(JSON.stringify(payload), keys.JWT_SECRET);

  res.status(201).json({ token });
};
