const { ctrlWrap, HttpError } = require("@helpers");
const { ARCCloud, Genius, UserService } = require("@services");

const findByRec = async (req, res) => {
  const { email } = req.user;
  const { metadata } = await ARCCloud.find();
  const [{ title, artists }] = metadata?.music;
  const artist = artists[0].name;
  const query = `${title} - ${artist}`;
  const data = await Genius.search(query);
  if (email) {
    await UserService.addToHistory(email, data);
  }
  res.status(200).json({ status: 200, message: "success", data });
};

module.exports = { findByRec: ctrlWrap(findByRec) };
