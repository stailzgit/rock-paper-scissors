const getUsers = require("./getUsers.js");
const getGames = require("./getGames.js");
const getRounds = require("./getRounds.js");
const getRoundsByGame = require("./getRoundsByGame.js");
const getGamesByUser = require("./getGamesByUser.js");
const login = require("./login.js");

module.exports = {
  getUsers,
  getGames,
  getRounds,
  getRoundsByGame,
  getGamesByUser,
  login,
};
