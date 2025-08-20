// api/view.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "lib/axios";



export const getTotalPodcastViews = async (podcastId: number) => {
  const response = await api.get(`/view/totalpodcast/${podcastId}`);
  return response.data;
};

export const addView = async (episodeId: number) => {
  await api.post(`/view/add/${episodeId}`, null);
};
// services/viewApi.ts
export const getViewHistory = async () => {
  const response = await api.get("/view/history");
  return response.data;
};

export const updateListenedDuration = async (episodeId: number, userId: number, duration: number) => {
  await api.patch(`/view/update-duration`, { episodeId, userId, listenedDuration: duration });
};



export const getTotalEpisodeViews = async (episodeId: number) => {
  const response = await api.get(`/view/totalepisodes/${episodeId}`);
  return response.data;
};
export const getRecommendedEpisodes = async (userId: number) => {
  try {
    const response = await api.get(`/recommendation/episodes/${userId}`);
    console.log("📡 API Recommendation response:", response.data); // 👈 LOG

    return response.data; 
  } catch (error) {
    console.error("❌ Erreur API getRecommendedEpisodes:", error);
    return [];
  }
  
};
