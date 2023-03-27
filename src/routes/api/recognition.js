const express = require("express");

const router = express.Router();

router.post("/recognition", recognitionCtrl.find);
