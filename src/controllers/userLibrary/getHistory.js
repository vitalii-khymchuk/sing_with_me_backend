const { ctrlWrap } = require("@helpers");
const { UserService } = require("@services");

const getHistory = async (req, res) => {
  const { email } = req.user;
  const data = await UserService.getHistory(email);

  res.status(200).json({ status: 200, message: "success", data });
};

module.exports = { getHistory: ctrlWrap(getHistory) };
