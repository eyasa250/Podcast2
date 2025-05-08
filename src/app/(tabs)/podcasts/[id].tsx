import { TracksList } from "@/components/TracksList";
import { useEpisodes } from "@/hooks/useEpisods";
import { getEpisodesByPodcastId } from "@/services/episodeApi";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";

export default function PodcastDetailScreen() {
  const { id } = useLocalSearchParams(); // Peut être string ou string[]

  const { episodes, loading, fetchEpisodesByPodcastId } = useEpisodes();

  useEffect(() => {
    fetchEpisodesByPodcastId(1); // ou autre ID selon le contexte
  }, []);
  

  if (loading) return <Text>Chargement...</Text>;

  return (
    <View style={{ padding: 16 }}>
      <TracksList
        data={episodes}
      
      />
    </View>
  );
}
