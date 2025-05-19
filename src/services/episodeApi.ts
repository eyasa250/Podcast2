import axios, { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "http://192.20.1.20:3001"; // remplace si besoin

const api = axios.create({
  baseURL: API_BASE_URL,

});

// Fonction pour récupérer tous les Episods
export const getAllEpisods = async () => {
  try {
    const response = await api.get("/episodes");
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Erreur réponse API :", error.response?.data || error.message);
    } else {
      console.error("Erreur inconnue :", error);
    }
    throw error;
  }
};

// Fonction pour récupérer un Episod par ID
export const getEpisodById = async (id: number) => {
  try {
    const response = await api.get(`/episodes/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Erreur lors de la récupération du Episod:", error.response?.data || error.message);
    } else {
      console.error("Erreur inconnue :", error);
    }
    throw error;
  }
};


export const createEpisod = async (podcastId: number | string, formData: FormData) => {
  try {
    const token = await AsyncStorage.getItem("auth_token");
    const response = await api.post(`/episodes/${podcastId}/add`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    return response.data;
  } catch (error: any) {
    // Gestion des erreurs...
  }
};



export const getEpisodesByPodcastId = async (podcastId: string | number) => {
  const response = await api.get(`/episodes/by-podcast/${podcastId}`);
  return response.data;
};

export default api;
