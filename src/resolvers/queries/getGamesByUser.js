module.exports = async (_, { userId }, { models }) => {
  return await models.Game.find({
    $or: [{ "user1.id": userId }, { "user2.id": userId }],
  }).populate("rounds");
};
