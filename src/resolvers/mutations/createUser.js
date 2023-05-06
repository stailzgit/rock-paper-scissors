// const { transformGame } = require("../merge");
const { transformUser } = require("../merge");

module.exports = async (_, { input }, { models }) => {
  try {
    const newUser = new models.User(input);
    const createdUser = await newUser.save();
    return transformUser(createdUser);
  } catch (err) {
    throw err;
  }

  // return {
  //   ...createdUser._doc,
  //   id,
  //   name,
  // };
  // return createdUser;
};
