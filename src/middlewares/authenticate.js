const { GoogleAuth } = require("@services");
const { HttpError } = require("../helpers");

const authenticate =
  ({ shouldPassError = true } = {}) =>
  async (req, res, next) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    try {
      if (bearer !== "Bearer" || !token) {
        throw HttpError(401);
      }
      const payload = await GoogleAuth.verify(token);
      req.user = payload;
      next();
    } catch (error) {
      if (shouldPassError) {
        console.log(error);
        next(HttpError(401));
      }
      next();
    }
  };

module.exports = { authenticate };
