import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { usePodcasts } from "@/hooks/usePodcasts";



export default function podcastScreen() {
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
        <Text style={{ color: "#007AFF", fontWeight: "bold" }}>+ Nouvelle podcast</Text>
      </TouchableOpacity>

      <FlatList
        data={podcasts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/(tabs)/podcasts`)}
            style={styles.episodeItem}
          >
            <Image source={{ uri: item.artwork }} style={{ width: 50, height: 50, borderRadius: 5 }} />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.episodeTitle}>{item.title}</Text>
              <Text style={styles.episodeDuration}>Par {item.artist}</Text>
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
  coverImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: "gray",
    marginBottom: 15,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 5,
  },
  buttonOutline: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonOutlineText: {
    color: "#007AFF",
    fontSize: 16,
    marginLeft: 5,
  },
  episodeItem: {
    flexDirection: "row",
    justifyContent: "space-between",
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
