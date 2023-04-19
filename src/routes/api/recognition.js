const express = require("express");
const { recognitionCtrl } = require("@controllers");
const { handleFormData, authenticate } = require("@middlewares");

const router = express.Router();
router.post(
  "/recognition/search",
  authenticate({ shouldPassError: false }),
  handleFormData.single("sample"),
  recognitionCtrl.findByRec
);
router.get(
  "/recognition/search",
  authenticate({ shouldPassError: false }),
  recognitionCtrl.findByText
);
router.get(
  "/recognition/getinfo/:id",
  authenticate({ shouldPassError: false }),
  recognitionCtrl.getInfo
);

module.exports = router;
