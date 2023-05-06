// const { transformGame } = require("../merge");
const { transformUser } = require("../merge");

module.exports = async (_, { input }, { models }) => {
<<<<<<< HEAD
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
=======
  const newUser = new models.User(input);
  const createdUser = await newUser.save();
  return createdUser;
>>>>>>> 6975dffe4f9e228c0c2d7c052188bb808b7ac9d5
};
