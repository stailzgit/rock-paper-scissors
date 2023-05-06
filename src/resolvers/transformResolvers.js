const { Game } = require("../models/game");
const { Round } = require("../models/round");
const { User } = require("../models/user");

const transformGames = async (gamesIds) => {
  try {
    const games = await Game.find({ _id: { $in: gamesIds } });
    return games.map((game) => ({
      ...game._doc,
      user1: {
        user: transformUser(game._doc.user1.user),
        score: game._doc.user1.score,
      },
      user2: {
        user: transformUser(game._doc.user2.user),
        score: game._doc.user2.score,
      },
      rounds: transformRounds(game._doc.rounds),
    }));
  } catch (err) {
    throw err;
  }
};

const transformRounds = async (roundsIds) => {
  try {
    const rounds = await Round.find({ _id: { $in: roundsIds } });
    return rounds.map((round) => ({
      ...round._doc,
      id: round._doc.id,
      game: transformGames(round._doc.game),
      user1: {
        user: transformUser(round._doc.user1.user),
        pick: round._doc.user1.pick,
      },
      user2: {
        user: transformUser(round._doc.user2.user),
        pick: round._doc.user2.pick,
      },
    }));
  } catch (err) {
    throw err;
  }
};

const transformUser = async (userId) => {
  if (!userId) return null;
  try {
    const user = await User.findById(userId);

    const { _id: id, games, rounds } = user;
    return {
      ...user._doc,
      id,
      games: transformGames(games),
      rounds: transformRounds(rounds),
    };
  } catch (err) {
    throw err;
  }
};

module.exports = { transformUser, transformGames, transformRounds };
// const transformGames = async (gamesIds) => {
//   try {
//     const games = await Game.find({ _id: { $in: gamesIds } });
//     return games.map((game) => ({
//       ...game._doc,
//       user1: {
//         user: transformUser.bind(this, game._doc.user1.user),
//         score: game._doc.user1.score,
//       },
//       user2: {
//         user: transformUser.bind(this, game._doc.user2.user),
//         score: game._doc.user2.score,
//       },
//       rounds: transformRounds.bind(this, game._doc.rounds),
//     }));
//   } catch (err) {
//     throw err;
//   }
// };

// const transformRounds = async (roundsIds) => {
//   try {
//     const rounds = await Round.find({ _id: { $in: roundsIds } });
//     return rounds.map((round) => ({
//       ...round._doc,
//       id: round._doc.id,
//       game: transformGames(this, round._doc.game),
//       user1: {
//         user: transformUser.bind(this, round._doc.user1.user),
//         pick: round._doc.user1.pick,
//       },
//       user2: {
//         user: transformUser.bind(this, round._doc.user2.user),
//         pick: round._doc.user2.pick,
//       },
//     }));
//   } catch (err) {
//     throw err;
//   }
// };

// const transformUser = async (userId) => {
//   console.log("userId", userId);
//   try {
//     const user = await User.findById(userId);
//     return {
//       ...user._doc,
//       id: user._doc._id,
//       games: transformGames.bind(this, user._doc.games),
//       rounds: transformRounds.bind(this, user._doc.rounds),
//     };
//   } catch (err) {
//     throw err;
//   }
// };

// module.exports = { transformUser, transformGames, transformRounds };
