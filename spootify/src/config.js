import dotenv from "dotenv";

dotenv.config();

export default {
  api: {
    baseUrl: "https://api.spotify.com/v1/browse",
    authUrl: "https://accounts.spotify.com/api/token",
    clientId: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
    clientSecret: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET,
  },
};
