import { getAllEpisods } from "@/services/episodeApi";
import { useEffect, useState } from "react";
import { Track } from "react-native-track-player";

const API_BASE_URL = "http://192.168.1.24:3001"; // À remplacer par ton vrai domaine

export const useEpisods = () => {
  const [Episods, setEpisods] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllEpisods();

        // Vérifie que `data` est bien un tableau avant de le mapper
        if (!Array.isArray(data)) {
          throw new Error("Données invalides reçues de l'API");
        }

        // Transformation des données API en format TrackPlayer
        const formattedData: Track[] = data.map((Episods: any) => ({
          id: Episods.id?.toString() || Math.random().toString(), // Évite les erreurs si `id` est manquant
          url: Episods.audioUrl?.startsWith("http") ? Episods.audioUrl : `${API_BASE_URL}${Episods.audioUrl}`,
          title: Episods.title || "Titre inconnu",
          artist: Episods.channel?.name || "Artiste inconnu",
          artwork: Episods.artwork ,
          languageTranscriptions: Episods.transcriptionUrls || {}, // on ajoute ici

        }));

        setEpisods(formattedData);
      } catch (err: any) {
        console.error("Erreur lors de la récupération des Episods:", err);
        setError(err.message || "Impossible de récupérer les Episods");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { Episods, loading, error };
};
