import { useEffect, useState } from "react";
import { getAllPodcasts, getPodcastsByUser } from "@/services/podcastApi";
import { Podcast } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

type UsePodcastsOptions = {
  own?: boolean; // true => fetch only podcasts of the logged-in user
  userId?: string; // option to specify a specific userId
};

const formatPodcastsData = (data: any[]): Podcast[] =>
  data.map((podcast) => ({
    id: podcast.id?.toString(),
    title: podcast.title || "Unknown title",
    description: podcast.description || "No description",
    category: podcast.category || "No category",
    image:podcast.image,
    author: podcast.user?.name || "Unknown author",
    userId:podcast.userId
  }));

export const usePodcasts = (options: UsePodcastsOptions = {}) => {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPodcasts = async () => {
    setLoading(true);
    setError(null);

    try {
      let data;
      if (options.own) {
        const userJson = await AsyncStorage.getItem("user");
        if (!userJson) throw new Error("User not logged in");

        const user = JSON.parse(userJson);
        const userId = user.id;
        if (!userId) throw new Error("User not logged in");
        data = await getPodcastsByUser(userId);
      } else if (options.userId) {
        data = await getPodcastsByUser(options.userId);
      } else {
        data = await getAllPodcasts();
      }

      setPodcasts(formatPodcastsData(data));
    } catch (err: any) {
      setError(err.message || "Error retrieving podcasts");
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPodcasts();
  }, [options.own, options.userId]);

  return {
    podcasts,
    loading,
    error,
    refetch: fetchPodcasts,
  };
};
