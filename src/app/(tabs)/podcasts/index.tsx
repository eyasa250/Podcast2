import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { usePodcasts } from "@/hooks/usePodcasts";

export default function PodcastScreen() {
  const router = useRouter();
  const { podcasts, loading, error } = usePodcasts();

  if (loading) return <Text>Chargement des podcasts...</Text>;
  if (error) return <Text>Erreur : {error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Podcasts disponibles</Text>

      <TouchableOpacity
        style={{ marginBottom: 20, alignSelf: "flex-end" }}
        onPress={() => router.push("/(tabs)/podcasts/create")}
      >
        <Text style={{ color: "#007AFF", fontWeight: "bold" }}>+ Nouveau podcast</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginBottom: 20, alignSelf: "flex-end" }}
        onPress={() => router.push("/(tabs)/podcasts/stepper")}
      >
        <Text style={{ color: "#007AFF", fontWeight: "bold" }}>+ Nouveau episode</Text>
      </TouchableOpacity>

      <FlatList
        data={podcasts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
          onPress={() => {
        //    console.log("Podcast ID sélectionné :", item.id); // 👈 Log ici
         //  router.push({ pathname: "/(tabs)/podcasts/[id]", params: { id: item.id } });
         router.push({ pathname: "/(tabs)/podcasts/podcastEp"})  }}
          style={styles.episodeItem}
        >
        
            <Image
              source={{ uri: item.artwork || "https://via.placeholder.com/50" }}
              style={{ width: 50, height: 50, borderRadius: 5 }}
            />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.episodeTitle}>{item.title}</Text>
              <Text style={styles.episodeDuration}>Par {item.artist || "Inconnu"}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="gray" />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  episodeItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  episodeTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  episodeDuration: {
    fontSize: 14,
    color: "gray",
  },
});
