const { ctrlWrap } = require("@helpers");
const { ARCCloud } = require("@services");

const find = async (req, res) => {
  const { metadata } = await ARCCloud.find();
  res.status(200).json({ status: 200, data: metadata });
};

module.exports = { find: ctrlWrap(find) };
