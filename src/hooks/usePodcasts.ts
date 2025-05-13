import { useEffect, useState } from "react";
import { getAllPodcasts } from "@/services/podcastApi";  // Assure-toi que cette API est correcte
import { Podcast } from "@/types"; // Importer les types Podcast et Episode

export const usePodcasts = () => {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]); // Met à jour pour utiliser le type Podcast
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllPodcasts(); // Appel API pour récupérer les podcasts

        // Vérifie que `data` est bien un tableau de podcasts avant de le mapper
        if (!Array.isArray(data)) {
          throw new Error("Données invalides reçues de l'API");
        }

        // Transformation des données API en format Podcast
        const formattedData: Podcast[] = data.map((podcast: any) => ({
          id: podcast.id?.toString(),
          title: podcast.title || "Titre inconnu",
          description: podcast.description || "Pas de description",
          artwork: podcast.artwork || "https://via.placeholder.com/150",
          author: podcast.user?.name || "Auteur inconnu",
        }));

        setPodcasts(formattedData); // Mise à jour de l'état avec les podcasts formatés
      } catch (err: any) {
        console.error("Erreur lors de la récupération des podcasts:", err);
        setError(err.message || "Impossible de récupérer les podcasts");
      } finally {
        setLoading(false);
      }
    };

    fetchData(); // Appel de la fonction de récupération des podcasts
  }, []);

  return { podcasts, loading, error }; // Retourner les podcasts, loading et error
};
