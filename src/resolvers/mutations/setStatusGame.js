const mongoose = require("mongoose");
const { transformUser } = require("../transformResolvers");
const { transformGame } = require("../merge");

module.exports = async (_, { userId, statusGame }, { models }) => {
  try {
    const findUser = await models.User.findById({ _id: userId });

    findUser.statusGame = statusGame;

    const updateUser = await findUser.save();

    return { userId, statusGame };
  } catch (error) {
    throw error;
  }
};
