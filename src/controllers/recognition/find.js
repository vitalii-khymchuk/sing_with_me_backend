const { ctrlWrap } = require("@helpers");
const { ARCCloud } = require("@services");

const find = async (req, res) => {
  const { formData } = req.body;
  console.log("body", formData);
  // const result = await ARCCloud.find(data);
  res.status(200).json({ status: 200, data: result });
};

module.exports = { find: ctrlWrap(find) };
