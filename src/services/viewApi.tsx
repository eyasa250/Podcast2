// api/view.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "lib/axios";



export const getTotalPodcastViews = async (podcastId: number) => {
  const response = await api.get(`/view/totalpodcast/${podcastId}`);
  return response.data;
};

export const addView = async (episodeId: number) => {
  await api.post(`/view/${episodeId}`, null);
};
// services/viewApi.ts
export const getViewHistory = async () => {
  const response = await api.get("/view/history");
  return response.data;
};



export const getTotalEpisodeViews = async (episodeId: number) => {
  const response = await api.get(`/view/totalepisodes/${episodeId}`);
  return response.data;
};
