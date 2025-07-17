import { Podcast } from "@/types";
import { useEffect, useState } from "react";

export const usePodcastDetails = (podcastId: string) => {
  const [podcast, setPodcast] = useState<Podcast | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!podcastId) return;

    const fetchPodcast = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`http://192.168.1.18:3001/podcasts/${podcastId}`);
        if (!res.ok) throw new Error("Erreur de chargement");
        const data: Podcast = await res.json();
        setPodcast(data);
      } catch (err: any) {
        setError(err.message || "Error retrieving podcast id");
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPodcast();
  }, [podcastId]);

  return { podcast, loading, error };
};