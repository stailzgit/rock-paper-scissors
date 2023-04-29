const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    _id: ID!
    name: String!
    games: [Game]
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
