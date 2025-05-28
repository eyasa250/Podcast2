import axios from "lib/axios";

export const getFavoriteCount = (episodeId: number) =>
  axios.get(`/favorites/count/${episodeId}`);

export const addFavorite = (episodeId: number) =>
  axios.post(`/favorites/${episodeId}`);

export const removeFavorite = (episodeId: number) =>
  axios.delete(`/favorites/${episodeId}`);

export const getUserFavorites = (userId: number) =>
  axios.get(`/favorites/user/${userId}`);
