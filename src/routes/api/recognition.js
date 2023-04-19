const express = require("express");
const { recognitionCtrl } = require("@controllers");
const { handleFormData } = require("@middlewares");

const router = express.Router();
router.post(
  "/recognition/search",
  handleFormData.single("sample"),
  recognitionCtrl.findByRec
);
router.get("/recognition/search", recognitionCtrl.findByText);
router.get("/recognition/getinfo/:id", recognitionCtrl.getInfo);

module.exports = router;
