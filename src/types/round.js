const { gql } = require("apollo-server");

module.exports = gql`
  type Round {
    id: ID!
    game: ID
    winnerRound: ID
    user1: userInRound
    user2: userInRound
  }

  type userInRound {
    id: ID!
    pick: PickEnum
  }

  enum PickEnum {
    ROCK
    PAPER
    SCISSORS
  }

  input userInRoundInput {
    id: ID!
    pick: PickEnum
  }

  input CreateRoundInput {
    game: ID!
    user1: userInRoundInput!
    user2: userInRoundInput!
  }

  input roundUserPickInput {
    roundId: ID!
    userId: ID!
    pick: PickEnum
  }

  type Mutation {
    createRound(input: CreateRoundInput!): Round!
    roundUserPick(input: roundUserPickInput!): Round!
  }

  type Query {
    getRounds: [Round!]!
    getRoundsByGame(gameId: ID!): [Round]
  }
`;
