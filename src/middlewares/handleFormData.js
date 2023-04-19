const multer = require("multer");
const path = require("path");
const { v4: uuid } = require("uuid");
const { HttpError } = require("@helpers");

const uploadDir = path.join(__dirname, "..", "..", "tmp");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const extensions = [".wav"];
    const fileName = `${uuid()}_${file.originalname}`;

    if (!extensions.some((e) => fileName.toLowerCase().endsWith(e))) {
      cb(HttpError(400, "Invalid extension type"));
    } else {
      cb(null, fileName);
    }
  },
});

const handleFormData = multer({
  storage: storage,
  limits: { fileSize: 5048576 },
});

module.exports = { handleFormData };
