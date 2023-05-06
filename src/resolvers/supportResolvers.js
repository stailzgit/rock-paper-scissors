const { Game, User, Round } = require("../models");

const supportGames = async (gamesIds) => {
  // if (!gamesIds) return [];
  console.log("gamesIds", gamesIds);
  try {
    const games = await Game.find({ _id: { $in: gamesIds } });
    return games.map((game) => ({
      ...game,
      user1: {
        user: supportUser(user1.user),
        score: game.user1.score,
      },
      user2: {
        user: supportUser(game.user2.user),
        score: game.user2.score,
      },
    }));
  } catch (err) {
    throw err;
  }
};

const supportRounds = async (roundsIds) => {
  try {
    const rounds = await Round.find({ _id: { $in: roundsIds } });
    return rounds.map((round) => ({
      ...round,
      user1: {
        user: supportUser(round.user1.user),
        pick: round.user1.pick,
      },
      user2: {
        user: supportUser(round.user2.user),
        pick: round.user2.pick,
      },
    }));
  } catch (err) {
    throw err;
  }
};

const supportUser = async (userId) => {
  try {
    const user = await User.findById(userId);
    console.log("usersId", userId);
    console.log("user", user);
    return {
      ...user,
      games: supportGames(user.games),
    };
  } catch (err) {
    throw err;
  }
};

module.exports = { supportUser, supportGames, supportRounds };
