const { google } = require("googleapis");

const REDIRECT_URL = "http://localhost:3001/api/v1/auth/google/callback";
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  REDIRECT_URL
);

module.exports = { oauth2Client };
