const mongoose = require("mongoose");
const { transformGame, transformUser } = require("../merge");
const { User, Game } = require("../../models");

module.exports = async (_, { senderId, recipientId }) => {
  try {
    const sender = await User.findById({ _id: senderId });
    const recipient = await User.findById({ _id: recipientId });

    //Check exist invite
    if (
      !sender.outgoingInvitations.includes(recipientId) ||
      !recipient.incomingInvitations.includes(senderId)
    ) {
      throw Error("Invitation no longer exists");
    }

    await User.updateOne({ _id: senderId }, { $pull: { outgoingInvitations: recipientId } });
    await User.updateOne({ _id: recipientId }, { $pull: { incomingInvitations: senderId } });

    //Create Game
    const newGame = new Game(input);
    newGame.sender = { id: input.senderId, score: 0 };
    newGame.recipient = { id: input.recipientId, score: 0 };

    const createdGame = await newGame.save();

    sender.games.push(createdGame.id);
    recipient.games.push(createdGame.id);

    const updateSender = await sender.save();
    const updateRecipient = await recipient.save();

    return {
      sender: transformUser(updateSender),
      recipient: transformUser(updateRecipient)
    };
    // return [transformUser(updateSender), transformUser(updateRecipient)];
  } catch (error) {
    throw error;
  }
};
