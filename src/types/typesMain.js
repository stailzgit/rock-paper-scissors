const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    id: ID!
    name: String!
    games: [Game]
    rounds: [Round]
  }

  type userInGame {
    id: ID!
    score: Int
  }

  type Game {
    id: ID!
    user1: userInGame
    user2: userInGame
    winner: User
    rounds: [Round]
    endGameScore: Int
  }

  type userInRound {
    id: ID!
    choice: String
  }

  type Round {
    id: ID!
    game: ID!
    user1: userInRound
    user2: userInRound
  }

  input CreateUserInput {
    name: String!
  }

  input CreateGameInput {
    userId1: ID!
    userId2: ID!
    endGameScore: Int
  }

  input CreateRoundInput {
    game: ID!
    user1: userInRoundInput
    user2: userInRoundInput
  }

  input userInRoundInput {
    id: ID!
    choice: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    createGame(input: CreateGameInput!): Game!
    createRound(input: CreateRoundInput!): Round!
  }

  type Query {
    getUsers: [User!]!
    getGames: [Game!]!
    getRounds: [Round!]!
  }
`;
