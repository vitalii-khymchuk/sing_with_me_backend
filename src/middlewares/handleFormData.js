const multer = require("multer");
const path = require("path");
const { HttpError } = require("@helpers");

const uploadDir = path.join(__dirname, "..", "..", "tmp");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const extensions = [".wav"];
    const fileName = file.originalname;

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
