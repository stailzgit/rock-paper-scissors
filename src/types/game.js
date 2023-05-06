const { gql } = require("apollo-server");

module.exports = gql`
  type Game {
    _id: ID!
    user1: userInGame
    user2: userInGame
    winnerGame: User
    rounds: [Round]
    endGameScore: Int
  }

  type userInGame {
    user: User
    score: Int
  }

  input CreateGameInput {
    userId1: ID!
    userId2: ID!
    endGameScore: Int
  }

  type Mutation {
    createGame(input: CreateGameInput!): Game!
  }

  type Query {
    getGames: [Game!]!
  }
`;
