const mongoose = require("mongoose");
const { transformUser } = require("../transformResolvers");
const { transformGame } = require("../merge");

module.exports = async (_, { userId, statusGame }, { models }) => {
  try {
    const findUser = await models.User.findById({ _id: userId });
    console.log("findUser", findUser);
    findUser.statusGame = statusGame;

    const updateUser = await findUser.save();
    console.log("updateUser", updateUser);

    return { userId, statusGame };
  } catch (error) {
    throw error;
  }
};
