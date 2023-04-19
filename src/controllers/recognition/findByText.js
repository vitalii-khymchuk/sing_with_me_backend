const { ctrlWrap, HttpError } = require("@helpers");
const { Genius } = require("@services");

const findByText = async (req, res) => {
  const { email } = req.user;
  if (!email) {
    throw HttpError(401);
  }
  const { query } = req.query;
  if (!query) {
    throw HttpError(400);
  }
  const data = await Genius.search(query);
  await UserService.addToHistory(email, data);
  res.status(200).json({ status: 200, message: "success", data });
};

module.exports = { findByText: ctrlWrap(findByText) };
