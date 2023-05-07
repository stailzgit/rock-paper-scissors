const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String
    games: [Game]
  }

  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }

  input CreateUserInput {
    name: String!
    email: String!
    password: String
  }

  input LoginInput {
    email: String!
    password: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
  }

  type Query {
    getUsers: [User!]!
    getGamesByUser(userId: ID!): [Game!]!
    login(input: LoginInput!): AuthData!
  }
`;
