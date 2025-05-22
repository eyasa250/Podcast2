import axios from "axios";
import { List } from "react-native-paper";

const API_BASE_URL = "http://192.168.1.20:3001";

const api = axios.create({
  baseURL: API_BASE_URL,
});
/* export const uploadEpisode = async (
  podcastId: string,
  episodeData: {
    title: string;
    description: string;
    trackType: 'AUDIO' | 'VIDEO';
    audience: 'GENERAL' | 'ADULT';
    subtitles: boolean;
    soundEnhancement: boolean;
    tags: string[];
    mediaFile: any;
    imageFile?: any;
  }
) => {
  const formData = new FormData();

  formData.append('title', episodeData.title);
  formData.append('description', episodeData.description);
  formData.append('trackType', episodeData.trackType);
  formData.append('audience', episodeData.audience);
  formData.append('subtitles', episodeData.subtitles.toString());
  formData.append('soundEnhancement', episodeData.soundEnhancement.toString());

  episodeData.tags.forEach(tag => {
    formData.append('tags[]', tag);
  });

  formData.append('files', {
    uri: episodeData.mediaFile.uri,
    name: episodeData.mediaFile.name,
    type: episodeData.mediaFile.mimeType || (episodeData.trackType === 'AUDIO' ? 'audio/mpeg' : 'video/mp4'),
  } as any);

  if (episodeData.imageFile) {
    formData.append('files', {
      uri: episodeData.imageFile.uri,
      name: episodeData.imageFile.name,
      type: episodeData.imageFile.mimeType || 'image/jpeg',
    } as any);
  }

  const response = await fetch(`http://192.168.1.20:3001/episodes/${podcastId}/add`, {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();
  return data;
}; */
export const uploadEpisode = async (podcastId: string, formData: FormData) => {
  const response = await fetch(`http://192.168.1.20:3001/episodes/${podcastId}/add`, {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();
  return data;
};

export const getAllEpisods = async () => {
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



export const getEpisodesByPodcastId = async (podcastId: string | number) => {
  const response = await api.get(`/episodes/by-podcast/${podcastId}`);
  return response.data;
};

export default api;