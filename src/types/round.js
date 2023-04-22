const { gql } = require("apollo-server");

module.exports = gql`
  type Round {
    id: ID!
    game: ID!
    user1: userInRound
    user2: userInRound
  }

  input CreateRoundInput {
    game: ID!
    user1: userInRoundInput
    user2: userInRoundInput
  }

  type Mutation {
    createRound(input: CreateRoundInput!): Round!
  }

  type Query {
    getRounds: [Round!]!
    getRoundsByGame(gameId: ID!): [Round]
  }
`;
