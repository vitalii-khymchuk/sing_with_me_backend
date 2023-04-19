const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("@helpers");

const urlSchema = {
  type: String,
  minLength: 3,
  trim: true,
  match: /^(http|https):\/\//,
};

const savedSongSchema = {
  id: {
    type: String,
    required: true,
  },
  full_title: {
    type: String,
    required: true,
  },
  header_image_thumbnail_url: { ...urlSchema, default: "" },
  header_image_url: { ...urlSchema, default: "" },
  release_date_for_display: {
    type: String,
    default: "no data",
  },
};

const userSchema = new Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    token: {
      type: String,
      default: null,
    },
    saved: {
      type: [{ ...savedSongSchema }],
      default: [],
    },
    history: {
      type: [
        {
          query: String,
          thumb: { ...urlSchema, default: "" },
          hits: [{ ...savedSongSchema }],
        },
      ],
      default: [],
    },
  },

  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

module.exports = { User };
