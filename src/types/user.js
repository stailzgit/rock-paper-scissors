const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    id: ID!
    name: String!
    games: [Game]
    # rounds: [Round]
  }

  input CreateUserInput {
    name: String!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
  }

  type Query {
    getUsers: [User!]!
    getGamesByUser(userId: ID!): [Game!]!
  }
`;
