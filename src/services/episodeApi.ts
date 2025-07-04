import axios from "axios";
import { List } from "react-native-paper";

const API_BASE_URL = "http://192.168.1.22:3001";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const uploadEpisode = async (podcastId: string, formData: FormData) => {
  
 // console.log('FormData api', formData);

  const response = await fetch(`http://192.168.1.22:3001/episodes/${podcastId}/add`, {
    method: 'POST',
    body: formData,
  });
//console.log('FormData api', formData);
  const data = await response.json();
  return data;
};

/* export const getAllEpisods = async () => {
  try {
    const response = await api.get("/episodes");
        console.log("liste des episodes:",response.data);

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Erreur API:", error.response?.data || error.message);
    } else {
      console.error("Erreur inconnue:", error);
    }
    throw error;
  }
}; */

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



export const getEpisodesByPodcastId = async (podcastId: string | number) => {
  const response = await api.get(`/episodes/by-podcast/${podcastId}`);
  return response.data;
};

export default api;