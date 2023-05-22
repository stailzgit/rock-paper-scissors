const mongoose = require("mongoose");
const { transformGame, transformUser } = require("../merge");
const { User, Game } = require("../../models");
const { RecipientStatus, SenderStatus } = require("../../models/constants");
import { PubSub } from "graphql-subscriptions";
const pubsub = new PubSub();

module.exports = async (_, { senderId, recipientId }) => {
  try {
    const sender = await User.findById({ _id: senderId });
    const recipient = await User.findById({ _id: recipientId });

    //Check already exist invite
    if (
      sender.outgoingInvitations.includes(recipientId) ||
      recipient.incomingInvitations.includes(senderId)
    ) {
      throw Error("Invite already send");
    }

    sender.outgoingInvitations.push(recipientId);
    recipient.incomingInvitations.push(senderId);

    //Create Game
    const newGame = new Game({
      sender: { id: senderId, score: 0 },
      recipient: { id: recipientId, score: 0 }
    });
    // newGame.sender = { id: senderId, score: 0 };
    // newGame.recipient = { id: recipientId, score: 0 };

    const createdGame = await newGame.save();

    sender.games.push(createdGame.id);
    recipient.games.push(createdGame.id);

    const updateSender = await sender.save();
    const updateRecipient = await recipient.save();

    const ANSWER_RECIPIENT = "ANSWER_RECIPIENT";

    //Create subscription
    const timeoutInvite = setTimeout(async () => {
      const gameAwait = await Game.findById({ _id: createdGame.id });
      console.log("gameAwait", gameAwait);
      if (!gameAwait.recipient.status && gameAwait.sender.status !== SenderStatus.CANCEL) {
        pubsub.publish(ANSWER_RECIPIENT, { status: RecipientStatus.CANCEL });
        const update1 = await User.updateOne(
          { _id: senderId },
          { $pull: { outgoingInvitations: recipientId } }
        );
        const update2 = await User.updateOne(
          { _id: recipientId },
          { $pull: { incomingInvitations: senderId } }
        );
        console.log(update1, update2);
      }
    }, 10000);

    return {
      sender: transformUser(updateSender),
      recipient: transformUser(updateRecipient)
    };
    // return [transformUser(updateSender), transformUser(updateRecipient)];
  } catch (error) {
    throw error;
  }
};
