const mongoose = require("mongoose");
const { UserStatusGames } = require("./constants");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const User = mongoose.model(
  "User",

  new Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    token: { type: String },
    games: [{ type: ObjectId, ref: "Game" }],
    incomingInvitations: [{ type: ObjectId, ref: "User" }],
    outgoingInvitations: [{ type: ObjectId, ref: "User" }],
    statusGame: {
      type: String,
      enum: [...Object.values(UserStatusGames)],
      required: true,
      default: UserStatusGames.OFFLINE,
    },
  })
);

module.exports = { User };
