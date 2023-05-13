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
  if (!gameId) return null;
  try {
    const game = await gameLoader.load(gameId.toString());
    return transformGame(game);
  } catch (err) {
    throw err;
  }
};

const userFormat = async (userId) => {
  if (!userId) return null;
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
    winnerGameId: userFormat.bind(this, game.winnerGameId),
    sender: {
      id: userFormat.bind(this, game.sender.id),
      score: game.sender.score,
    },
    recipient: {
      id: userFormat.bind(this, game.recipient.id),
      score: game.recipient.score,
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
  const { id, game, winnerRoundId, sender, recipient } = round;
  return {
    ...round._doc,
    id: id,
    game: () => gameFormat(game),
    winnerRoundId: () => userFormat(winnerRoundId),
    sender: {
      user: () => userFormat(sender.id),
      pick: sender.pick,
    },
    recipient: {
      user: () => userFormat(recipient.user),
      pick: recipient.pick,
    },
  };
};

module.exports = {
  transformUser,
  transformRound,
  transformGame,
};
