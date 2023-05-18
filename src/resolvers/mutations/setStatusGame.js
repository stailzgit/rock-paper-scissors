import mongoose from "mongoose";
import { transformGame } from "../merge.js";
import { User } from "../../models/user.js";

export default async (_, { userId, statusGame }, {}) => {
  try {
    const findUser = await User.findById({ _id: userId });
    findUser.statusGame = statusGame;
    await findUser.save();
    return { userId, statusGame };
  } catch (error) {
    throw error;
  }
};
