const { ctrlWrap, HttpError } = require("@helpers");
const { Genius, UserService } = require("@services");

const findByText = async (req, res) => {
  const email = req.user?.email;
  const { query } = req.query;
  if (!query) {
    throw HttpError(400);
  }
  const data = await Genius.search(query);
  if (email) {
    await UserService.addToHistory(email, data, query);
  }
  res.status(200).json({ status: 200, message: "success", data });
};

module.exports = { findByText: ctrlWrap(findByText) };
