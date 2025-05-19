import { EpisodeList } from "@/components/EpisodeList";
import { useEpisodes } from "@/hooks/useEpisods";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { View, Text, Button, TouchableOpacity ,StyleSheet } from "react-native";

export default function PodcastDetailScreen() {
  const { id } = useLocalSearchParams(); // ID du podcast
  const { episodes, loading, fetchEpisodesByPodcastId } = useEpisodes();
  const router = useRouter(); // Pour naviguer vers la page de création d'épisode

  console.log("id podcast", id);

  useEffect(() => {
    const podcastId = Array.isArray(id) ? id[0] : id;

    if (podcastId) {
      fetchEpisodesByPodcastId(podcastId); // Utilise l'ID pour récupérer les épisodes du podcast
    }
  }, [id]);


  if (loading) return <Text>Chargement...</Text>;

  return (
   <TouchableOpacity
         style={{ marginBottom: 20, alignSelf: "flex-end" }}
         onPress={() => router.push(`/(tabs)/podcasts/stepper?id=${id}`)}
         >
         <Text style={styles.link}>+ New Episode</Text>
       </TouchableOpacity>
 
  );
}
const styles = StyleSheet.create({

  link: {
    color: "#007AFF",
    fontWeight: "bold",
  },
});
