const express = require("express");
const { userLibrariesCtrl } = require("@controllers");
const { authenticate } = require("@middlewares");

const router = express.Router();

// router.get("/libraries", authenticate, userLibrariesCtrl.getAllLibs);
// router.get("libraries/:libraryId", userLibrariesCtrl.getOneLib);
// router.post("libraries", userLibrariesCtrl.creteLib);
// router.patch("libraries/:libraryId", userLibrariesCtrl.editLib);
// router.delete("libraries/:libraryId", userLibrariesCtrl.removeLib);

// router.get("libraries/:libraryId/:songId", userLibrariesCtrl.getSong);
// router.post("libraries/:libraryId/", userLibrariesCtrl.addSong);
// router.delete("libraries/:libraryId/:songId", userLibrariesCtrl.deleteSong);

module.exports = router;
