const { ctrlWrap } = require("@helpers");
const { ARCCloud } = require("@services");

const find = async (req, res) => {
  const { formData } = req.body;
  const result = await ARCCloud.find();

  res.status(200).json({ status: 200, data: result });
};

module.exports = { find: ctrlWrap(find) };
