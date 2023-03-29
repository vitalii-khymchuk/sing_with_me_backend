const { ctrlWrap } = require("@helpers");
const { oauth2Client } = require("@services");

const signIn = (req, res) => {
  const scopes = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
  ];
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });

  res.redirect(url);
};

module.exports = { signIn: ctrlWrap(signIn) };
