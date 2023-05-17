import gql from "graphql-tag";

export default gql`
  type Round {
    id: ID!
    game: Game
    winnerRoundId: User
    sender: userInRound
    recipient: userInRound
  }

  type userInRound {
    id: User
    pick: PickEnum
  }

  enum PickEnum {
    ROCK
    PAPER
    SCISSORS
  }

  # input userInRoundInput {
  #   user: ID!
  #   pick: PickEnum
  # }

  input CreateRoundInput {
    gameId: ID!
    senderId: ID!
    recipientId: ID!
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
