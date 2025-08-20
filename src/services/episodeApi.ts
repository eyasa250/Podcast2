import { Episode } from "@/types";
import axios from "axios";


import api from "lib/axios";

export const uploadEpisode = async (podcastId: string, formData: FormData) => {
  try {
    const response = await api.post(`/episodes/${podcastId}/add`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("✅ Épisode ajouté :", response.data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("❌ Erreur upload épisode :", error.response.data);
    } else {
      console.error("❌ Erreur réseau :", error.message);
    }
    throw error;
  }
};


export const getAllEpisodes = async (): Promise<Episode[]> => {
  try {
    const response = await api.get(`/episodes/allEpisodes`); // endpoint correct
    return response.data; // ✅ sans les parenthèses
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Erreur récupération épisode:", error.response?.data || error.message);
    } else {
      console.error("Erreur inconnue:", error);
    }
    throw error;
  }
};

export const getEpisodById = async (id: number) => {
  try {
    const response = await api.get(`/episodes/${id}`);
            console.log("liste des episodes:",response.data);

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Erreur récupération épisode:", error.response?.data || error.message);
    } else {
      console.error("Erreur inconnue:", error);
    }
    throw error;
  }
};
export const updateEpisode = async (id: string, data: FormData) => {
  const response = await api.patch(`/episodes/${id}/edit`, data, {
    headers: {
      // Ne pas fixer Content-Type à 'application/json'
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const generateSubtitles = async (episodeId: number) => {
  try {
    const response = await api.patch(`/episodes/${episodeId}/subtitles`);
    console.log("✅ Sous-titres générés :", response.data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("❌ Erreur génération sous-titres :", error.response.data);
    } else {
      console.error("❌ Erreur réseau :", error.message);
    }
    throw error;
  }
};
export const enhanceEpisodeSound = async (episodeId: number) => {
  try {
    const response = await api.patch(`/episodes/${episodeId}/enhance`);
    console.log("✅ Son amélioré :", response.data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("❌ Erreur amélioration du son :", error.response.data);
    } else {
      console.error("❌ Erreur réseau :", error.message);
    }
    throw error;
  }
};


export const getEpisodesByPodcastId = async (podcastId: string | number) => {
  const response = await api.get(`/episodes/by-podcast/${podcastId}`);

  return response.data;
};
// 🔎 Recherche par tag
export const searchByTag = async (tag: string) => {
  const res = await api.get(`/search/tag/${tag}`);
  return res.data;
};

// 🔎 Recherche par description
export const searchByDescription = async (description: string) => {
  const res = await api.post(`/search/description`, { description });
  return res.data;
};
export default api;