import { EpisodeList } from "@/components/EpisodeList";
import { useAuth } from "@/hooks/useAuth";
import { useEpisodes } from "@/hooks/useEpisods";
import { usePodcastDetails } from "@/hooks/usePodcastDetails";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function PodcastDetailScreen() {
  const { id } = useLocalSearchParams(); // ID du podcast
    const Id = Array.isArray(id) ? id[0] : id; // ✅ Force en string
const { user } = useAuth(); // suppose que `user.id` existe
  const { podcast } = usePodcastDetails(id as string);

  const { episodes, loading, error } = useEpisodes({ podcastId: Id }); // <-- utilise useEpisodes
  
  const router = useRouter();

  useEffect(() => {
    console.log("📡 Podcast ID:", Id);
    console.log("🎧 Episodes:", episodes);
    if (error) {
      console.error("❌ Erreur dans useEpisodes:", error);
    }
  }, [episodes, error]);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TouchableOpacity
        style={{ marginBottom: 20, alignSelf: "flex-end" }}
        onPress={() => router.push(`/(tabs)/podcasts/stepper?id=${id}`)}
      >
        <Text style={styles.link}>+ New Episode</Text>
      </TouchableOpacity>

      {/* Affiche les épisodes */}
<EpisodeList data={episodes} />
    </View>
  );
}

const styles = StyleSheet.create({
  link: {
    color: "#007AFF",
    fontWeight: "bold",
  },
});
