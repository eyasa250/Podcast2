import { getAllPodcasts } from "@/services/podcastApi";
import { useEffect, useState } from "react";
import { Track } from "react-native-track-player";

const API_BASE_URL = "http://192.168.1.24:3001"; // Remplace par ton vrai domaine

export const usePodcasts = () => {
  const [podcasts, setPodcasts] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllPodcasts();

        // Transformation des données API en format TrackPlayer
        const formattedData: Track[] = data.map((podcast: any) => ({
          id: podcast.id.toString(),
          url: `${API_BASE_URL}${podcast.audioUrl}`, // Assurer une URL complète
          title: podcast.title, // Supprimer les guillemets en trop
          artist: podcast.channel?.name || "Inconnu",
          artwork: "https://via.placeholder.com/150", // Remplace par une vraie image si disponible
        }));

        setPodcasts(formattedData);
      } catch (err) {
        console.error("Erreur lors de la récupération des podcasts:", err);
        setError("Impossible de récupérer les podcasts");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { podcasts, loading, error };
};
