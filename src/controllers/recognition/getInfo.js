const { ctrlWrap } = require("@helpers");
const { Genius } = require("@services");

const getInfo = async (req, res) => {
  const { id } = req.params;
  const data = await Genius.getInfo(id);
  res.status(200).json({ code: 200, message: "success", data });
};

module.exports = { getInfo: ctrlWrap(getInfo) };
