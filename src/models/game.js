const mongoose = require("mongoose");
const { RecipientStatus, SenderStatus } = require("./constants");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const Game = mongoose.model(
  "Game",

  new Schema({
    sender: {
      id: { type: ObjectId, ref: "User" },
      score: { type: Number, default: 0 },
      status: {
        type: String,
        enum: [...Object.values(SenderStatus)],
        required: true,
      },
    },
    recipient: {
      id: { type: ObjectId, ref: "User" },
      score: { type: Number, default: 0 },
      status: {
        type: String,
        enum: [...Object.values(RecipientStatus)],
        required: true,
      },
    },
    rounds: [{ type: ObjectId, ref: "Round" }],
    winnerGameId: { type: ObjectId, ref: "User" },
    endGameScore: { type: Number, default: 1 },
  })
);

module.exports = { Game };
