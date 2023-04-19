const { ctrlWrap, HtmlError } = require("@helpers");
const { Genius } = require("@services");

const getOneSong = async (req, res) => {
  const { email } = req.user;
  const { id } = req.params;

  const data = await Genius.getInfo(email, id);

  res.status(200).json({ status: 200, message: "success", data });
};

module.exports = { getOneSong: ctrlWrap(getOneSong) };
