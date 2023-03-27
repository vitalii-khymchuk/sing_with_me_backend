const ctrlWrap = (ctrl) => {
  return async (req, res, next) => {
    try {
      await ctrl(req, res);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = { ctrlWrap };
