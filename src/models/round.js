const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const Round = mongoose.model(
  "Round",

  new Schema({
    game: { type: ObjectId, ref: "Game" },
    user1: {
      id: { type: ObjectId, ref: "User" },
      choice: { type: String },
    },
    user2: {
      id: { type: ObjectId, ref: "User" },
      choice: { type: String },
    },
  })
);

module.exports = { Round };
