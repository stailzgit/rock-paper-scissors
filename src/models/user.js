const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const User = mongoose.model(
  "User",

  new Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    games: [{ type: ObjectId, ref: "Game" }],
    token: { type: String },
    statusGame: {
      type: String,
      enum: ["OFFLINE", "ONLINE", "IN_SEARCH", "IN_GAME"],
      required: true,
      default: "OFFLINE",
    },
  })
);

module.exports = { User };
