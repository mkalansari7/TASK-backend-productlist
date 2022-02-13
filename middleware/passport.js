const User = require("../database/models/User");
const bcrypt = require("bcrypt");

const LocalStrategy = require("passport-local").Strategy;

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
	try {
		const user = await User.findOne({ username: username });
		const passwordsMatch = user
			? await bcrypt.compare(password, user.password)
			: false;

		passwordsMatch ? done(null, user) : done(null, false);
	} catch (error) {
		done(error);
	}
});
