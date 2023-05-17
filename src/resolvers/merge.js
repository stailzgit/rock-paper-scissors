import DataLoader from "dataloader";

import * as models from "../models/index.js";
const { User, Game, Round } = models;

export const userLoader = new DataLoader((userIds) =>
  User.find({ _id: { $in: userIds } })
);

export const gameLoader = new DataLoader((gameIds) =>
  Game.find({ _id: { $in: gameIds } })
);

export const gamesFormat = async (gameIds) => {
  try {
    const games = await Game.find({ _id: { $in: gameIds } });
    return games.map((game) => transformGame(game));
  } catch (err) {
    throw err;
  }
};

export const roundsFormat = async (roundIds) => {
  try {
    const rounds = await Round.find({ _id: { $in: roundIds } });
    return rounds.map((round) => transformRound(round));
  } catch (err) {
    throw err;
  }
};

export const usersFormat = async (userIds) => {
  try {
    const users = await User.find({ _id: { $in: userIds } });
    return users.map((user) => transformUser(user));
  } catch (err) {
    throw err;
  }
};

export const gameFormat = async (gameId) => {
  if (!gameId) return null;
  try {
    const game = await gameLoader.load(gameId.toString());
    return transformGame(game);
  } catch (err) {
    throw err;
  }
};

export const userFormat = async (userId) => {
  if (!userId) return null;
  try {
    const user = await userLoader.load(userId.toString());
    return transformUser(user);
  } catch (err) {
    throw err;
  }
};

export const transformGame = (game) => {
  return {
    ...game._doc,
    id: game.id,
    winnerGameId: userFormat.bind(this, game.winnerGameId),
    sender: {
      id: userFormat.bind(this, game.sender.id),
      ...game.sender,
      // score: game.sender.score,
      // status: game.sender.status,
    },
    recipient: {
      id: userFormat.bind(this, game.recipient.id),
      ...game.recipient,
      // score: game.recipient.score,
      // status: game.recipient.status,
    },
    rounds: roundsFormat.bind(this, game.rounds),
  };
};

export const transformUser = (user) => {
  return {
    ...user._doc,
    id: user.id,
    games: gamesFormat.bind(this, user.games),
    outgoingInvitations: usersFormat.bind(this, user.outgoingInvitations),
    incomingInvitations: usersFormat.bind(this, user.incomingInvitations),
  };
};

export const transformRound = (round) => {
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

// export default {
//   transformUser,
//   transformRound,
//   transformGame,
// };
