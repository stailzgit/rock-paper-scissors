const DataLoader = require("dataloader");

const { User, Game, Round } = require("../models");

const userLoader = new DataLoader((userIds) =>
  User.find({ _id: { $in: userIds } })
);

const gameLoader = new DataLoader((gameIds) =>
  Game.find({ _id: { $in: gameIds } })
);

const gamesFormat = async (gameIds) => {
  try {
    const games = await Game.find({ _id: { $in: gameIds } });
    return games.map((game) => transformGame(game));
  } catch (err) {
    throw err;
  }
};

const roundsFormat = async (roundIds) => {
  try {
    const rounds = await Round.find({ _id: { $in: roundIds } });
    return rounds.map((round) => transformRound(round));
  } catch (err) {
    throw err;
  }
};

const gameFormat = async (gameId) => {
  try {
    const game = await gameLoader.load(gameId.toString());
    return transformGame(game);
  } catch (err) {
    throw err;
  }
};

const userFormat = async (userId) => {
  try {
    const user = await userLoader.load(userId.toString());
    return transformUser(user);
  } catch (err) {
    throw err;
  }
};

const transformGame = (game) => {
  return {
    ...game._doc,
    id: game.id,
    winnerGame: userFormat.bind(this, game.winnerGame),
    user1: {
      user: userFormat.bind(this, game.user1.user),
      score: game.user1.score,
    },
    user2: {
      user: userFormat.bind(this, game.user2.user),
      score: game.user2.score,
    },
    rounds: roundsFormat.bind(this, game.rounds),
  };
};

const transformUser = (user) => {
  return {
    ...user._doc,
    id: user.id,
    games: gamesFormat.bind(this, user.games),
  };
};

const transformRound = (round) => {
  return {
    ...round._doc,
    id: round.id,
    game: gameFormat.bind(this, round.game),
    winnerRound: userFormat.bind(this, round.winnerRound),
    user1: {
      user: userFormat.bind(this, round.user1.user),
      pick: round.user1.pick,
    },
    user2: {
      user: userFormat.bind(this, round.user2.user),
      pick: round.user2.pick,
    },
  };
};

module.exports = {
  transformUser,
  transformRound,
  transformGame,
};
