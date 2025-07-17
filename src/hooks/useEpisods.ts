import { useEffect, useState } from "react";
import {
  getEpisodesByPodcastId,
  
} from "@/services/episodeApi";
import { Episode } from "@/types";
import { getUserFavorites } from "@/services/favoritesApi";

type UseEpisodesOptions = {
  podcastId?: string | number;
  favorites?: boolean;
};

const formatEpisodesData = (data: any[]): Episode[] => {
  return data.map((ep) => ({
    id: ep.id?.toString(),
    title: ep.title || "Untitled",
    description: ep.description || "No description",
    trackType: ep.trackType || "AUDIO",
    audience: ep.audience || "GENERAL",
    tags: Array.isArray(ep.tags) ? ep.tags : JSON.parse(ep.tags || '[]'),
    createdAt: ep.createdAt,
    audioUrl: ep.audioUrl || null,
    videoUrl: ep.videoUrl || null,
    coverImageUrl: ep.coverImageUrl || "",
    subtitles: ep.subtitles,
    transcriptionUrls: ep.transcriptionUrls || {},
    soundEnhancement: ep.soundEnhancement,
    soundEnhancementUrl: ep.soundEnhancementUrl || null,
    podcastId: ep.podcastId,
    podcast: {
      id: ep.podcast?.id,
      title: ep.podcast?.title || "Unknown Podcast",
      description: ep.podcast?.description || "",
      createdAt: ep.podcast?.createdAt,
      userId: ep.podcast?.userId,
      category: ep.podcast?.category || "UNKNOWN",
    },
  }));
};

export const useEpisodes = (options: UseEpisodesOptions = { favorites: false }) => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEpisodes = async () => {
    setLoading(true);
    setError(null);

    try {
      let data;

      if (options.favorites) {
        data = await getUserFavorites();
      } else if (options.podcastId) {
        data = await getEpisodesByPodcastId(options.podcastId);
      } else {
        console.log("Ni podcastId ni favoris fournis.");
        data = [];
      }

      setEpisodes(formatEpisodesData(data));
    } catch (err: any) {
      setError(err.message || "Erreur lors de la récupération des épisodes");
     // console.error("Erreur API:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEpisodes();
  }, [options.podcastId, options.favorites]);

  return {
    episodes,
    loading,
    error,
    refetch: fetchEpisodes,
  };
};
