const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const Game = mongoose.model(
  "Game",

  new Schema({
    user1: {
      id: { type: ObjectId, ref: "User" },
      score: { type: Number, default: 0 },
    },
    user2: {
      id: { type: ObjectId, ref: "User" },
      score: { type: Number, default: 0 },
    },
    winner: { type: ObjectId, ref: "User" },
    rounds: [{ type: ObjectId, ref: "Round" }],
    endGameScore: { type: Number, default: 1 },
  })
);

module.exports = { Game };
