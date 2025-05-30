// api/favorites.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "lib/axios";

const getAuthHeaders = async () => {
  const token = await AsyncStorage.getItem("auth_token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getFavoriteCount = async (episodeId: number) => {
  const headers = await getAuthHeaders();
  const response = await axios.get(`/favorites/count/${episodeId}`, headers);
  return response.data;
};

export const addFavorite = async (episodeId: number) => {
  const headers = await getAuthHeaders();
  await axios.post(`/favorites/${episodeId}`, null, headers);
};

export const removeFavorite = async (episodeId: number) => {
  const headers = await getAuthHeaders();
  await axios.delete(`/favorites/${episodeId}`, headers);
};

export const getUserFavorites = async () => {
  const headers = await getAuthHeaders();
  const response = await axios.get(`/favorites/user/`, headers);
  return response.data;
};
