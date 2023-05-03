const { ctrlWrap } = require("@helpers");
const { UserService } = require("@services");

const logout = async (req, res) => {
  const { email } = req.user;
  await UserService.logout(email);
  res.status(200).json({ code: 200, message: "success" });
};

module.exports = { logout: ctrlWrap(logout) };
