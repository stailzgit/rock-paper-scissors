const UserStatus = {
  OFFLINE: "OFFLINE",
  ONLINE: "ONLINE",
  IN_SEARCH: "IN_SEARCH",
  IN_GAME: "IN_GAME"
};

const SenderStatus = {
  SEND: "SEND",
  CANCEL: "CANCEL"
};

const RecipientStatus = {
  ACCEPT: "ACCEPT",
  CANCEL: "CANCEL"
};

const CHOICE = {
  ROCK: "ROCK",
  PAPER: "PAPER",
  SCISSORS: "SCISSORS"
};

//Subscription
const ANSWER_RECIPIENT = "ANSWER_RECIPIENT";

module.exports = {
  UserStatus,
  SenderStatus,
  RecipientStatus,
  CHOICE,
  ANSWER_RECIPIENT
};
