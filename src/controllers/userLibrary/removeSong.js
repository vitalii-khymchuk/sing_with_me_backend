const { ctrlWrap, HttpError } = require("@helpers");
const { UserService } = require("@services");

const removeSong = async (req, res) => {
  const { email } = req.user;
  const { songId } = req.params;
  if (!songId) {
    throw HttpError(400);
  }
  const data = await UserService.removeFromSaved(email, songId);

  res.status(200).json({ status: 200, message: "success", data });
};

module.exports = { removeSong: ctrlWrap(removeSong) };
