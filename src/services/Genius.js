const axios = require("axios");

const { GENIUS_ACCESS_TOKEN } = process.env;

const geniusAPI = axios.create({
  baseURL: "https://api.genius.com",
  headers: { Authorization: `Bearer ${GENIUS_ACCESS_TOKEN}` },
});

const search = async (query = "Hymn For the Weekend - Coldplay") => {
  const options = { params: { q: query } };
  const { data } = await geniusAPI.get("/search", options);
  const result =
    data.response.hits.length > 0
      ? data.response.hits.map(
          ({
            result: {
              id,
              full_title,
              header_image_thumbnail_url,
              header_image_url,
              release_date_for_display,
            },
          }) => ({
            id,
            full_title,
            header_image_thumbnail_url,
            header_image_url,
            release_date_for_display,
          })
        )
      : [];
  return result;
};

const getInfo = async (id = 2353271) => {
  const { data } = await geniusAPI.get(`/songs/${id}`);
  const {
    song: {
      apple_music_player_url,
      description,
      artist_names,
      embed_content,
      header_image_thumbnail_url,
      header_image_url,
      release_date_for_display,
      title,
      album: { cover_art_url, name, release_date_for_display: release_date },
      media,
      primary_artist,
      producer_artists,
      song_relationships,
    },
  } = data.response;

  const relation_songs =
    song_relationships.length > 0
      ? song_relationships.map(({ relationship_type, songs }) => ({
          relationship_type,
          songs: songs.map(
            ({
              id,
              full_title,
              header_image_thumbnail_url,
              release_date_for_display,
            }) => ({
              id,
              full_title,
              header_image_thumbnail_url,
              release_date_for_display,
            })
          ),
        }))
      : [];

  return {
    id,
    apple_music_player_url,
    description,
    artist_names,
    embed_content,
    header_image_thumbnail_url,
    header_image_url,
    release_date_for_display,
    title,
    album: { cover_art_url, name, release_date },
    media,
    primary_artist,
    producer_artists,
    relation_songs,
  };
};

module.exports = { search, getInfo };
