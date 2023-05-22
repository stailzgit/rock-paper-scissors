const mongoose = require("mongoose");
const { transformGame } = require("../merge");
const { User } = require("../../models");
const { subscribe } = require("graphql");
import { PubSub } from "graphql-subscriptions";
import { ANSWER_RECIPIENT } from "../../models/constants";
const pubsub = new PubSub();

module.exports = async (_, { userId, statusGame }) => {
  subscribe: () => pubsub.asyncIterator([ANSWER_RECIPIENT])
};
