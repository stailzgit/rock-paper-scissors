// const { transformGame } = require("../merge");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { transformUser } = require("../merge");

module.exports = async (_, { input }, { models }) => {
  const { name, email, password } = input;
  const existingUser = await models.User.findOne({ email: email });

  if (existingUser) {
    throw new ApolloError(
      "A user is already registered with the email " + email,
      "USER_ALREADY_EXIST"
    );
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  const newUser = new models.User({
    name,
    email: email.toLowerCase(),
    password: encryptedPassword,
  });

  const token = jwt.sign({ userId: newUser.id.email }, "UNSAVE_STRING", {
    expiresIn: "2h",
  });

  newUser.token = token;

  const createdUser = await newUser.save();

  return transformUser(createdUser);
};
