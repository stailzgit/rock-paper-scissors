const registerUser = require("./registerUser");
const createGame = require("./createGame");
const createRound = require("./createRound");
const roundUserPick = require("./roundUserPick");
const loginUser = require("./loginUser.js");
const setStatusGame = require("./setStatusGame.js");

module.exports = {
  createGame,
  registerUser,
  createRound,
  roundUserPick,
  loginUser,
  setStatusGame,
};
