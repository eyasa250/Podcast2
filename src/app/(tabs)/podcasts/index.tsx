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

  // Ajoute l'item spécial à la fin
  const dataWithAddNew = [...podcasts, { id: "add-new", isAddNew: true }];

  return (
    <View style={styles.container}>
      {/* On supprime le FAB existant car on va l'intégrer dans la grille */}
      <PodcastGrid
        data={dataWithAddNew}
        onAddPress={() => router.push("/(tabs)/podcasts/create")}
      />
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
