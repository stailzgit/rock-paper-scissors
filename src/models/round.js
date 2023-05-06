const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const Round = mongoose.model(
  "Round",

  new Schema({
    game: { type: ObjectId, ref: "Game" },
    winnerRound: { type: ObjectId, ref: "User" },
    user1: {
      user: { type: ObjectId, ref: "User" },
      pick: { type: String, enum: ["ROCK", "PAPER", "SCISSORS"] },
    },
    user2: {
      user: { type: ObjectId, ref: "User" },
      pick: { type: String, enum: ["ROCK", "PAPER", "SCISSORS"] },
    },
  })
);

module.exports = { Round };
