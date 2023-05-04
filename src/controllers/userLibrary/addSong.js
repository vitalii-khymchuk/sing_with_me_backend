const { ctrlWrap, HttpError } = require("@helpers");
const { UserService } = require("@services");

const addSong = async (req, res) => {
  const { email } = req.user;
  const {
    id,
    full_title,
    header_image_thumbnail_url,
    header_image_url,
    release_date_for_display,
  } = req.body;
  if (!id || !full_title) {
    throw HttpError(400);
  }
  const data = await UserService.addToSaved(email, {
    id,
    full_title,
    header_image_thumbnail_url,
    header_image_url,
    release_date_for_display,
  });

  res.status(201).json({ status: 201, message: "success", data });
};

module.exports = { addSong: ctrlWrap(addSong) };
