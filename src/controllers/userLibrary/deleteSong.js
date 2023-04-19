const { ctrlWrap, HtmlError } = require("@helpers");
const { UserService } = require("@services");

const addSong = async (req, res) => {
  const { email } = req.user;
  const { id } = req.params;
  if (!id) {
    throw HtmlError(400);
  }
  const data = await UserService.removeFromSaved(email, id);

  res.status(200).json({ status: 200, message: "success", data });
};

module.exports = { addSong: ctrlWrap(addSong) };
