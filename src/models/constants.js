const UserStatus = {
  OFFLINE: "OFFLINE",
  ONLINE: "ONLINE",
  IN_SEARCH: "IN_SEARCH",
  IN_GAME: "IN_GAME",
};

const SenderStatus = {
  SEND: "SEND",
  CANCEL: "CANCEL",
};

const RecipientStatus = {
  SEND: "ACCEPT",
  CANCEL: "CANCEL",
};

module.exports = {
  UserStatus,
  SenderStatus,
  RecipientStatus,
};
