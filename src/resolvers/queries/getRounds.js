module.exports = async (_, {}, { models }) => {
  return await models.Round.find({});
};
