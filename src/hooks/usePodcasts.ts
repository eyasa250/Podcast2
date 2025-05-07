import { getAllPodcasts } from "@/services/podcastApi";
import { useEffect, useState } from "react";
import { Track } from "react-native-track-player";

const API_BASE_URL = "http://192.168.1.24:3001"; // À remplacer par ton vrai domaine

export const useEpisods = () => {
  const [podcasts, setPodcasts] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllPodcasts();

        // Vérifie que `data` est bien un tableau avant de le mapper
        if (!Array.isArray(data)) {
          throw new Error("Données invalides reçues de l'API");
        }

        // Transformation des données API en format TrackPlayer
        const formattedData: Track[] = data.map((podcast: any) => ({
          id: podcast.id?.toString() || Math.random().toString(), // Évite les erreurs si `id` est manquant
          url: podcast.audioUrl?.startsWith("http") ? podcast.audioUrl : `${API_BASE_URL}${podcast.audioUrl}`,
          title: podcast.title || "Titre inconnu",
          artist: podcast.channel?.name || "Artiste inconnu",
          artwork: podcast.artwork /* || "https://via.placeholder.com/150" */, // Utilise l'image fournie si disponible
        }));

        setPodcasts(formattedData);
      } catch (err: any) {
        console.error("Erreur lors de la récupération des podcasts:", err);
        setError(err.message || "Impossible de récupérer les podcasts");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { podcasts, loading, error };
};
