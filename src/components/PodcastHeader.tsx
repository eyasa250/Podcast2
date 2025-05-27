import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

interface PodcastHeaderProps {
  title: string;
  author: string;
  duration: string;
  image: string;
}

export const PodcastHeader: React.FC<PodcastHeaderProps> = ({ title, author, duration, image }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.author}>by {author}</Text>
      <Text style={styles.duration}>{duration}</Text>

      <TouchableOpacity style={styles.playButton}>
        <Text style={styles.playText}>▶️ Play</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 12,
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  author: {
    fontSize: 16,
    color: "#ccc",
  },
  duration: {
    fontSize: 14,
    color: "#999",
    marginBottom: 10,
  },
  playButton: {
    backgroundColor: "#1DB954",
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 20,
    marginTop: 10,
  },
  playText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
