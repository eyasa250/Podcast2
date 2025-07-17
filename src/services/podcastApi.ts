import axios, { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import api from "lib/axios";



// Fonction pour récupérer les podcasts d'un utilisateur spécifique
export const getPodcastsByUser = async (userId: string) => {
  try {
    const response = await api.get(`/podcasts/user/${userId}`);  // Assure-toi que cette route existe sur ton backend
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Erreur lors de la récupération des podcasts de l'utilisateur :", error.response?.data || error.message);
    } else {
      console.error("Erreur inconnue :", error);
    }
    throw error;
  }
};
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
  const token = await AsyncStorage.getItem("auth_token");

  if (!token) throw new Error("Token non trouvé");

  const response = await api.post(
    `/podcasts/add`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data", 
      },
    }
  );

  return response.data;
};



export default api;
