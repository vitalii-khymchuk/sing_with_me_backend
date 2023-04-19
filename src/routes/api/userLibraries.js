const express = require("express");
const { userLibraryCtrl } = require("@controllers");
const { authenticate } = require("@middlewares");

const router = express.Router();

router.get("/saved", authenticate(), userLibraryCtrl.getAllSongs);
router.post("/saved", authenticate(), userLibraryCtrl.addSong);
router.delete("/saved/:songId", authenticate(), userLibraryCtrl.removeSong);

module.exports = router;
