// hooks/useFavorites.ts
import { addView, getTotalEpisodeViews, getTotalPodcastViews } from "@/services/viewApi";
import { useState } from "react";


export const useView = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const TotalPodcastViews = async (podcastId: number) => {
    try {
      setLoading(true);
      const data = await getTotalPodcastViews(podcastId);
      return data;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
 const TotalEpisodesViews = async (episodeId: number) => {
    try {
      setLoading(true);
      const data = await getTotalEpisodeViews(episodeId);
      return data;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const newView = async (episodeId: number) => {
    try {
      setLoading(true);
      await addView(episodeId);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };



  return {
    loading,
    error,
    TotalPodcastViews,
    TotalEpisodesViews,
    newView,
  };
};
