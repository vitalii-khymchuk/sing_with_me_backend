const { ctrlWrap, HttpError } = require("@helpers");
const { ARCCloud, Genius, UserService } = require("@services");
const fs = require("fs/promises");

const findByRec = async (req, res) => {
  const email = req.user?.email;
  const { filename, path } = req.file;
  const { metadata } = await ARCCloud.find({ filename, path });
  await fs.unlink(path);
  if (!metadata) {
    return res.status(200).json({ status: 200, message: "success", data: [] });
  }
  const [{ title, artists }] = metadata?.music;
  const artist = artists[0].name;

  let query = `${artist} ${title}`;
  const symbolIndex = query.indexOf("(");
  if (symbolIndex !== -1) {
    query = query.slice(0, symbolIndex);
  }
  const data = await Genius.search(query);
  if (!data || data.length === 0) {
    return res.status(200).json({ status: 200, message: "success", data: [] });
  }
  if (email && data && data.length !== 0) {
    await UserService.addToHistory(email, data);
  }
  res.status(200).json({ status: 200, message: "success", data });
};

module.exports = { findByRec: ctrlWrap(findByRec) };
