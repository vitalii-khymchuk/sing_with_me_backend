const { HttpError, ctrlWrap } = require("@helpers");

const current = async (req, res, next) => {
  try {
    const userData = req.user;

    res.status(200).json({
      code: 200,
      message: "success",
      data: userData,
    });
  } catch (error) {
    console.log(error);
    next(HttpError(401));
  }
};

module.exports = { current: ctrlWrap(current) };
