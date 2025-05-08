import { TracksList } from "@/components/TracksList";
import { useEpisodes } from "@/hooks/useEpisods";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { View, Text, Button } from "react-native";

export default function PodcastDetailScreen() {
  const { id } = useLocalSearchParams(); // ID du podcast
  const { episodes, loading, fetchEpisodesByPodcastId } = useEpisodes();
  const router = useRouter(); // Pour naviguer vers la page de création d'épisode
  
  useEffect(() => {
    fetchEpisodesByPodcastId(1); // Utilise l'ID récupéré depuis les paramètres de navigation
  }, [id]);

  // Fonction de redirection vers le formulaire de création d'épisode
  const handleCreateEpisode = () => {
    router.push("/podcasts/VideoUploader"); // Navigue vers la page de création d'épisode
  };

  if (loading) return <Text>Chargement...</Text>;

  return (
    <View style={{ padding: 16 }}>
      {/* Liste des épisodes */}
      <TracksList data={episodes} />
      
      {/* Bouton pour ajouter un épisode */}
      <Button title="Créer un épisode" onPress={handleCreateEpisode} />
    </View>
  );
}
