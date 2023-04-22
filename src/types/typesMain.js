const { gql } = require("apollo-server");

module.exports = gql`
  type Mutation {
    createUser(input: CreateUserInput!): User!
    createGame(input: CreateGameInput!): Game!
    createRound(input: CreateRoundInput!): Round!

    setChoice(input: setChoiceInput!): returnSetChoice!
  }

  type Query {
    getUsers: [User!]!
    getGames: [Game!]!
    getRounds: [Round!]!
  }
`;
