const { google } = require("googleapis");

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET);

const verify = async (token) => {
  try {
    const ticket = await oauth2Client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (payload.email_verified) {
      return payload;
    } else {
      throw new Error("Email address not verified");
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports = { verify };
