const registerUser = require("./registerUser");
const createGame = require("./createGame");
const createRound = require("./createRound");
const roundUserPick = require("./roundUserPick");
const loginUser = require("./loginUser.js");
const setStatusGame = require("./setStatusGame.js");
const logoutUser = require("./logoutUser.js");
const sendingInvite = require("./sendingInvite.js");

module.exports = {
  createGame,
  registerUser,
  createRound,
  roundUserPick,
  loginUser,
  setStatusGame,
  logoutUser,
  sendingInvite
};
