import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const episodes = [
  { id: "1", title: "Épisode 1 - Introduction", duration: "12:45" },
  { id: "2", title: "Épisode 2 - Histoire et évolution", duration: "24:30" },
  { id: "3", title: "Épisode 3 - Astuces et conseils", duration: "18:20" },
];

export default function PlaylistScreen() {
  return (
    <View style={styles.container}>
      {/* Image de couverture */}
      <Image
        source={{ uri: "https://via.placeholder.com/300x200" }}
        style={styles.coverImage}
      />

      {/* Nom de la playlist */}
      <Text style={styles.title}>Ma Playlist Favoris</Text>
      <Text style={styles.description}>Une sélection des meilleurs épisodes pour vous.</Text>

      {/* Boutons Play et Shuffle */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="play" size={24} color="#fff" />
          <Text style={styles.buttonText}>Lecture</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonOutline}>
          <Ionicons name="shuffle" size={24} color="#007AFF" />
          <Text style={styles.buttonOutlineText}>Aléatoire</Text>
        </TouchableOpacity>
      </View>

      {/* Liste des épisodes */}
      <FlatList
        data={episodes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.episodeItem}>
            <View>
              <Text style={styles.episodeTitle}>{item.title}</Text>
              <Text style={styles.episodeDuration}>{item.duration}</Text>
            </View>
            <TouchableOpacity>
              <Ionicons name="ellipsis-vertical" size={20} color="gray" />
            </TouchableOpacity>
          </View>
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
