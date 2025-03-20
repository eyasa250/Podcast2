import axios, { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "http://192.168.1.24:3001"; // Remplace par ton URL d'API

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur pour ajouter automatiquement le token à chaque requête
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("auth_token");
    console.log("Token récupéré:", token); // Ajout du log

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Headers envoyés:", config.headers); // Ajout du log

    }else
     {  
        console.error("Aucun token trouvé !");
      }
    return config;
  },
  (error) => Promise.reject(error)
);

// Fonction pour récupérer tous les podcasts
export const getAllPodcasts = async () => {
  try {
    const response = await api.get("/podcasts");
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

// Fonction pour récupérer un podcast par ID
export const getPodcastById = async (id: number) => {
  try {
    const response = await api.get(`/podcasts/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Erreur lors de la récupération du podcast:", error.response?.data || error.message);
    } else {
      console.error("Erreur inconnue :", error);
    }
    throw error;
  }
};

// Fonction pour créer un podcast
export const createPodcast = async (formData: FormData) => {
  try {
    const response = await api.post("/podcasts/add", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Erreur lors de la création du podcast:", error.response?.data || error.message);
    } else {
      console.error("Erreur inconnue :", error);
    }
    throw error;
  }
};

export default api;
