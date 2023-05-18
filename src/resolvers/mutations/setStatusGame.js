const mongoose = require("mongoose");
const { transformGame } = require("../merge");
const { User } = require("../../models");

module.exports = async (_, { userId, statusGame }) => {
  try {
    const findUser = await User.findById({ _id: userId });
    findUser.statusGame = statusGame;
    await findUser.save();
    return { userId, statusGame };
  } catch (error) {
    throw error;
  }
};
