const { gql } = require("apollo-server");

module.exports = gql`
  type Game {
    id: ID!
    user1: userInGame
    user2: userInGame
    winner: User
    rounds: [Round]
    endGameScore: Int
  }

  type userInGame {
    id: ID!
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
