const express = require("express");
const { recognitionCtrl } = require("@controllers");
const { handleFormData } = require("@middlewares");

const router = express.Router();
router.post(
  "/recognition",
  handleFormData.single("sample"),
  recognitionCtrl.find
);

module.exports = router;
