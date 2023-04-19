const { GoogleAuth } = require("@services");
const { HttpError } = require("../helpers");
const { User } = require("@models");

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer" || !token) {
    next(HttpError(401));
  }
  try {
    const payload = await GoogleAuth.verify(token);
    // const [{ _id }] = await User.find({ email: payload.email });
    // payload.id = _id;
    req.user = payload;
    next();
  } catch (error) {
    console.log(error);
    next(HttpError(401));
  }
};

module.exports = { authenticate };
