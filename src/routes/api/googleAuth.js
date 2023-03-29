const express = require("express");
const { googleAuthCtrl } = require("@controllers");

const router = express.Router();

router.get("/auth", googleAuthCtrl.signIn);
router.get("/auth/google/callback", googleAuthCtrl.signInSuccess);

module.exports = router;
