const { ctrlWrap, HttpError } = require("@helpers");
const { oauth2Client } = require("@services");
const { google } = require("googleapis");

const signInSuccess = (req, res) => {
  const code = req.query.code;
  oauth2Client.getToken(code, (err, tokens) => {
    if (err) {
      console.log(err);
      throw HttpError(500, "Google authentication error");
    }
    oauth2Client.setCredentials(tokens);

    const people = google.people({
      version: "v1",
      auth: oauth2Client,
    });
    people.people.get(
      {
        resourceName: "people/me",
        personFields: "names,emailAddresses,photos",
      },
      (err, response) => {
        if (err) {
          console.log(err);
          throw HttpError(500, "Google authentication error");
        }
        const profile = response.data;

        res.json({ data: { profile, tokens } });
      }
    );
  });
};

module.exports = { signInSuccess: ctrlWrap(signInSuccess) };
