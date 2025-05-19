// hooks/useEpisodes.ts
import { useState } from "react";
import { createEpisod, getAllEpisods, getEpisodesByPodcastId } from "@/services/episodeApi";
import { Track } from "react-native-track-player";

const API_BASE_URL = "http://192.168.1.20:3001";

export const useEpisodes = () => {
  const [episodes, setEpisodes] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Formateur commun
  const formatData = (data: any[]): Track[] => {
    return data.map((episode: any) => ({
      id: episode.id?.toString() || Math.random().toString(),
      url: episode.audioUrl?.startsWith("http")
        ? episode.audioUrl
        : `${API_BASE_URL}${episode.audioUrl}`,
      title: episode.title || "Titre inconnu",
      artist: episode.podcast?.name || "Artiste inconnu",
      artwork: episode.artwork,
      languageTranscriptions: episode.transcriptionUrls || {},
    }));
  };

  const fetchAllEpisodes = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllEpisods();
      setEpisodes(formatData(data));
    } catch (err: any) {
      console.error("Erreur fetchAllEpisodes:", err.message);
      setError(err.message || "Erreur de récupération");
    } finally {
      setLoading(false);
    }
  };

  const fetchEpisodesByPodcastId = async (podcastId: number | string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getEpisodesByPodcastId(podcastId);
      setEpisodes(formatData(data));
    } catch (err: any) {
      console.error("Erreur fetchEpisodesByPodcastId:", err.message);
      setError(err.message || "Erreur de récupération");
    } finally {
      setLoading(false);
    }
  };
  const createEpisode = async (podcastId: number | string, formData: FormData) => {
    setLoading(true);
    setError(null);
    try {
      const newEpisode = await createEpisod(podcastId, formData);
      setEpisodes((prev) => [...prev, {
        id: newEpisode.id?.toString() || Math.random().toString(),
        url: newEpisode.audioUrl?.startsWith("http")
          ? newEpisode.audioUrl
          : `${API_BASE_URL}${newEpisode.audioUrl}`,
        title: newEpisode.title || "Titre inconnu",
        artist: newEpisode.podcast?.name || "Artiste inconnu",
        artwork: newEpisode.artwork,
        languageTranscriptions: newEpisode.transcriptionUrls || {},
      }]);
      return newEpisode;
    } catch (err: any) {
      console.error("Erreur createEpisode:", err.message);
      setError(err.message || "Erreur de création");
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  return {
    episodes,
    loading,
    error,
    fetchAllEpisodes,
    fetchEpisodesByPodcastId,  createEpisode, // 👈 Ajouter ceci

  };
};
