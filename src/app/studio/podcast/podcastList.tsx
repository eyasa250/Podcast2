// app/screens/MyPodcastsScreen.tsx
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { Podcast } from "@/types";
import { useAppSelector } from "@/hooks/reduxHooks";
import { MyPodcast } from "@/components/mypodcast";



export default function MyPodcastsScreen() {
  const router = useRouter();
      const { mine } = useAppSelector((state) => state.podcasts);

  const dataWithAddNew = [...mine, { id: "add-new", isAddNew: true }];

  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  

  const handleAddPress = () => {
    router.push("/studio/podcast/PodcastFormScreenpodcast/PodcastFormScreen"); // ou la route de création
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Mes Podcasts</Text>
      <MyPodcast podcasts={mine} loading={loading} error={error ?? undefined} onAddPress={handleAddPress} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#222",
  },
});
