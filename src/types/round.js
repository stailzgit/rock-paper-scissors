const { gql } = require("apollo-server");

module.exports = gql`
  type Round {
    _id: ID!
    game: Game
    winnerRound: User
    user1: userInRound
    user2: userInRound
  }

  type userInRound {
    user: User
    pick: PickEnum
  }

  enum PickEnum {
    ROCK
    PAPER
    SCISSORS
  }

  input userInRoundInput {
    roundId: ID!
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
