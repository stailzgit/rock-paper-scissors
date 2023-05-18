// const { transformGame } = require("../merge");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { transformUser } = require("../merge");
const { UserStatus } = require("../../models/constants");
const { User } = require("../../models/user");

module.exports = async (_, { input }, { models }) => {
  const { email, password } = input;
  const user = await User.findOne({ email: email });
  if (!user) throw new Error("User does not exist!");

  const isEqual = await bcrypt.compare(password, user.password);
  if (!isEqual) throw new Error("Password is incorrect!");

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    "somesupersecretkey",
    { expiresIn: "1h" }
  );
  user.token = token;
  user.statusGame = UserStatus.ONLINE;
  await user.save();

  return transformUser(user);
};
