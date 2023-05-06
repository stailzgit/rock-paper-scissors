const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const Game = mongoose.model(
  "Game",

  new Schema({
    user1: {
      user: { type: ObjectId, ref: "User" },
      score: { type: Number, default: 0 },
    },
    user2: {
      user: { type: ObjectId, ref: "User" },
      score: { type: Number, default: 0 },
    },
    rounds: [{ type: ObjectId, ref: "Round" }],
    winnerGame: { type: ObjectId, ref: "User", default: null },
    endGameScore: { type: Number, default: 1 },
  })
);

module.exports = { Game };
