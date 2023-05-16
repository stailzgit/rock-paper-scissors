const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String
    games: [Game]
    token: String
    statusGame: statusGame
    incomingInvitations: [User]
    outgoingInvitations: [User]
  }
  enum statusGame {
    OFFLINE
    ONLINE
    IN_GAME
    IN_SEARCH
  }

  # type AuthData {
  #   userId: ID!
  #   token: String!
  #   tokenExpiration: Int!
  # }

  type setStatusGameReturn {
    userId: ID
    statusGame: statusGame
  }

  input RegisterInput {
    name: String!
    email: String!
    password: String
  }

  input LoginInput {
    email: String!
    password: String
  }

  type Mutation {
    registerUser(input: RegisterInput): User
    loginUser(input: LoginInput): User
    logoutUser(userId: ID!): User
    setStatusGame(userId: ID!, statusGame: statusGame!): setStatusGameReturn
    sendingInvite(senderId: ID!, recipientId: ID!): [User]
  }

  type Query {
    getUsers: [User!]!
    getUserById(userId: ID!): User
    getUsersByStatusGame(statusGame: statusGame!, excludeMe: ID!): [User]
    getGamesByUser(userId: ID!): [Game!]
  }
`;
