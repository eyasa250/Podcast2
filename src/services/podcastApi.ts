import axios, { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "http://192.168.1.16:3001"; 

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
export const createPodcast = async (title: string, description: string) => {
  const token = await AsyncStorage.getItem("auth_token"); // ← CORRECT maintenant

  if (!token) throw new Error("Token non trouvé");

  const response = await axios.post(
    `${API_BASE_URL}/podcasts/add`,
    { title, description },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};



export default api;
