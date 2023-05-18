const mongoose = require("mongoose");
const { CHOICE } = require("./constants");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const Round = mongoose.model(
  "Round",

  new Schema({
    game: { type: ObjectId, ref: "Game" },
    winnerRoundId: { type: ObjectId, ref: "User" },
    sender: {
      id: { type: ObjectId, ref: "User" },
      pick: { type: String, enum: [...Object.values(CHOICE)] },
    },
    recipient: {
      id: { type: ObjectId, ref: "User" },
      pick: { type: String, enum: [...Object.values(CHOICE)] },
    },
  })
);

module.exports = { Round };
