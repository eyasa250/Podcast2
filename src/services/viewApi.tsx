// api/view.ts
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

export const getTotalPodcastViews = async (podcastId: number) => {
  const headers = await getAuthHeaders();
  const response = await axios.get(`/view/totalpodcast/${podcastId}`, headers);
  return response.data;
};

export const addView = async (episodeId: number) => {
  const headers = await getAuthHeaders();
  await axios.post(`/view/${episodeId}`, null, headers);
};



export const getTotalEpisodeViews = async (episodeId: number) => {
  const headers = await getAuthHeaders();
  const response = await axios.get(`/view/totalepisodes/${episodeId}`, headers);
  return response.data;
};
