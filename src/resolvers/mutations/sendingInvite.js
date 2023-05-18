import mongoose from "mongoose";
import { transformGame, transformUser } from "../merge.js";
import { User } from "../../models/user.js";

export default async (_, { senderId, recipientId }, {}) => {
  try {
    const sender = await User.findById({ _id: senderId });
    const recipient = await User.findById({ _id: recipientId });

    //Check already exist invite
    if (
      sender.outgoingInvitations.includes(recipientId) ||
      recipient.incomingInvitations.includes(senderId)
    ) {
      throw Error("Invite already sent");
    }

    sender.outgoingInvitations.push(recipientId);
    recipient.incomingInvitations.push(senderId);

    const updateSender = await sender.save();
    const updateRecipient = await recipient.save();
    console.log("updateSender", updateSender);
    console.log("updateRecipient", updateRecipient);

    return [transformUser(updateSender), transformUser(updateSender)];
  } catch (error) {
    throw error;
  }
};
