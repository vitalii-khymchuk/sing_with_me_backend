const { ctrlWrap } = require("@helpers");
const { UserService } = require("@services");

const getAllSongs = async (req, res) => {
  const { email } = req.user;
  const data = await UserService.getSaved(email);

  res.status(200).json({ status: 200, message: "success", data });
};

module.exports = { getAllSongs: ctrlWrap(getAllSongs) };
