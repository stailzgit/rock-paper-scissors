const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const User = mongoose.model(
  "User",

  new Schema({
    name: { type: String, required: true, unique: true },
    games: [{ type: ObjectId, ref: "Game" }],
  })
);

module.exports = { User };
