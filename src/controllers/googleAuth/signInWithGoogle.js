const { HttpError, ctrlWrap } = require("@helpers");
const { GoogleAuth, UserService, sendEmail } = require("@services");

const signInWithGoogle = async (req, res, next) => {
  try {
    const { credential: token } = req.body;
    const { name, email, picture } = await GoogleAuth.verify(token);

    await UserService.signInGoogle({
      email,
      token,
    });

    res.status(200).json({
      code: 200,
      message: "success",
      data: { name, email, picture },
      token,
    });
  } catch (error) {
    console.log(error);
    next(HttpError(401, "Google authentication error"));
  }
};

module.exports = { signInWithGoogle: ctrlWrap(signInWithGoogle) };
