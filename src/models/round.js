const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const Round = mongoose.model(
  "Round",

  new Schema({
    game: { type: ObjectId, ref: "Game" },
    winnerRoundId: { type: ObjectId, ref: "User" },
    sender: {
      id: { type: ObjectId, ref: "User" },
      pick: { type: String, enum: ["ROCK", "PAPER", "SCISSORS"] },
    },
    recipient: {
      id: { type: ObjectId, ref: "User" },
      pick: { type: String, enum: ["ROCK", "PAPER", "SCISSORS"] },
    },
  })
);

module.exports = { Round };
