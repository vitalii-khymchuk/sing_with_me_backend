const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const urlSchema = {
  type: String,
  minLength: 3,
  trim: true,
  match: /^(http|https):\/\//,
};

const songSchema = new Schema(
  {
    apple_music_player_url: {
      type: String,
      trim: true,
      default: "",
    },
    description: { dom: { type: Array, required: true } },
    artist_names: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 30,
    },
    embed_content: {
      type: String,
      default: "",
      trim: true,
    },
    header_image_thumbnail_url: {
      ...urlSchema,
    },
    header_image_url: {
      ...urlSchema,
    },
    release_date_for_display: {
      type: String,
      default: "no data",
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 30,
    },
    album: {
      cover_art_url: String,
      name: String,
      release_date: String,
    },
    media: {
      type: Array,
      default: [],
    },
    primary_artist: {
      type: Object,
    },
    producer_artists: {
      type: Object,
    },
    relation_songs: {
      type: [
        {
          relationship_type: String,
          songs: [
            {
              id: {
                type: String,
                required: true,
              },
              full_title: String,
              header_image_thumbnail_url: String,
              release_date_for_display: String,
            },
          ],
        },
      ],
    },
    owner: { type: Schema.Types.ObjectId, ref: "user", required: true },
  },

  { versionKey: false, timestamps: true }
);

songSchema.post("save", handleMongooseError);

const Song = model("song", songSchema);

module.exports = { Song };
