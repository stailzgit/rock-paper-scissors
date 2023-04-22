const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    id: ID!
    name: String!
    games: [Game]
    rounds: [Round]
  }

  type returnSetUserChoice {
    userId: ID!
    choice: String
  }

  input CreateUserInput {
    name: String!
  }

  input userInRoundInput {
    id: ID!
    choice: String
  }

  input setUserChoiceInput {
    gameId: ID!
    roundId: ID!
    userId: ID!
    choice: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    setUserChoice(input: setUserChoiceInput!): returnSetUserChoice!
  }

  type Query {
    getUsers: [User!]!
    getGamesByUser(userId: ID!): [Game!]!
  }
`;
