const express = require("express");
const { googleAuthCtrl } = require("@controllers");
const { authenticate } = require("@middlewares");

const router = express.Router();

router.post("/auth/signin", googleAuthCtrl.signInWithGoogle);
router.post(
  "/auth/logout",
  authenticate({ shouldPassError: true }),
  googleAuthCtrl.logout
);

module.exports = router;
