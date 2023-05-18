const gql = require("graphql-tag");

module.exports = gql`
  type Game {
    id: ID!
    sender: userInGame
    recipient: userInGame
    winnerGameId: User
    rounds: [Round]
    endGameScore: Int
  }

  type userInGame {
    id: User
    score: Int
  }

  input CreateGameInput {
    senderId: ID!
    recipientId: ID!
    endGameScore: Int
  }

  type Mutation {
    createGame(input: CreateGameInput!): Game!
  }

  type Query {
    getGames: [Game!]!
  }
`;
