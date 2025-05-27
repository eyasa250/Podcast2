import { EpisodeList } from "@/components/EpisodeList";
import { useAuth } from "@/hooks/useAuth";
import { useEpisodes } from "@/hooks/useEpisods";
import { usePodcastDetails } from "@/hooks/usePodcastDetails";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";

export default function PodcastDetailScreen() {
  const { id,title, description, author } = useLocalSearchParams();
  const Id = Array.isArray(id) ? id[0] : id;
  const { user } = useAuth();
  const { podcast } = usePodcastDetails(id as string);
  const { episodes } = useEpisodes({ podcastId: Id });
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* HEADER AVEC BACKGROUND IMAGE */}
      <ImageBackground
        source={{ uri: podcast?.coverImage || 'https://via.placeholder.com/500' }}
        style={styles.header}
        blurRadius={20}
      >
        <View style={styles.headerContent}>
          <Text style={styles.playlistType}>playlist</Text>
          <Text style={styles.title}>{title || "Podcast Title"}</Text>
          <Text style={styles.subtitle}>
            {description || "Description of the podcast goes here..."}
          </Text>
          <Text style={styles.madeFor}>Made for {author || "You"}</Text>
        </View>
      </ImageBackground>

      {/* BOUTONS */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={() => router.push(`/(tabs)/podcasts/stepper?id=${id}`)}
        >
          <Text style={styles.primaryButtonText}>Add episode</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
          <Text style={styles.secondaryButtonText}>Share</Text>
        </TouchableOpacity>
      </View>

    

      {/* EPISODES */}
      <View style={{ paddingHorizontal: 20 }}>
        <EpisodeList data={episodes} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#fff',
},
  header: {
    height: 300,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 30,
    alignItems: 'center',
textAlign: 'center',

  },
headerContent: {
  padding: 16,
  position: 'relative',
  backgroundColor: '#fff', // <-- changement ici
},

playlistType: {
  color: '#555', // ou '#000' pour noir complet
  fontSize: 14,
  textTransform: 'uppercase',
  fontWeight: '600',
  marginBottom: 8,
},
title: {
  color: '#000',
  fontSize: 28,
  fontWeight: 'bold',
  marginBottom: 4,
},
subtitle: {
  color: '#666',
  fontSize: 16,
},

  madeFor: {
    color: "#1db954",
    fontSize: 12,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 6,
    borderRadius: 8,
    alignItems: "center",
  },
  primaryButton: {
    backgroundColor: "#1db954",
  },
  secondaryButton: {
    backgroundColor: "#333",
  },
  primaryButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  secondaryButtonText: {
    color: "white",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    gap: 8,
    marginBottom: 20,
  },
  tag: {
    backgroundColor: "#282828",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: "#ccc",
    fontSize: 12,
  },
});
