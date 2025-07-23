// api/favorites.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "lib/axios";

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
  const response = await api.get(`/favorites/count/${episodeId}`, headers);
  return response.data;
};

export const addFavorite = async (episodeId: number) => {
  const headers = await getAuthHeaders();
  await api.post(`/favorites/add/${episodeId}`, null, headers);
};

export const removeFavorite = async (episodeId: number) => {
  const headers = await getAuthHeaders();
  await api.delete(`/favorites/${episodeId}`, headers);
};

export const getUserFavorites = async () => {
  const headers = await getAuthHeaders();
  const response = await api.get(`/favorites/user/`, headers);
    // console.log("📥 Données reçues de l'API /favorites:", response.data); // 👈 log ici

  return response.data;
};
