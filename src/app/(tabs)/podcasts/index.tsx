import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { usePodcasts } from "@/hooks/usePodcasts";
import { PodcastGrid } from "@/components/PodcastGrid";
import { Ionicons } from "@expo/vector-icons";

export default function PodcastScreen() {
  const router = useRouter();
  const { podcasts, loading, error } = usePodcasts({ own: true });

  if (loading) return <Text>Loading your podcasts...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View style={styles.container}>

<TouchableOpacity style={styles.fab} onPress={() => router.push("/(tabs)/podcasts/create")}>
  <Ionicons name="add" size={24} color="#fff" />
</TouchableOpacity>

{/*       <TouchableOpacity
        style={{ marginBottom: 20, alignSelf: "flex-end" }}
        onPress={() => router.push("/(tabs)/podcasts/stepper")}
      >
        <Text style={styles.link}>+ New Episode</Text>
      </TouchableOpacity> */}

      <PodcastGrid data={podcasts} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    // On prend une marge en bas ET en haut pour rester centré entre les deux barres
    bottom: 100, // Ajuste selon la hauteur de ta TabBar
    right: 20,
    alignItems: "center",
  },
  fab: {
    backgroundColor: "#007AFF",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  link: {
    color: "#007AFF",
    fontWeight: "bold",
  },
});
