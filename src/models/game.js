const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const Game = mongoose.model(
  "Game",

  new Schema({
    sender: {
      id: { type: ObjectId, ref: "User" },
      score: { type: Number, default: 0 },
    },
    recipient: {
      id: { type: ObjectId, ref: "User" },
      score: { type: Number, default: 0 },
    },
    rounds: [{ type: ObjectId, ref: "Round" }],
    winnerGameId: { type: ObjectId, ref: "User" },
    endGameScore: { type: Number, default: 1 },
  })
);

module.exports = { Game };
