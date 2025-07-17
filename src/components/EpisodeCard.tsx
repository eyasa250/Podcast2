import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { Episode } from "@/types";
import { formatDistanceToNow, parseISO } from "date-fns";
const convertToISO = (dateString: string) => {
  return dateString.replace(" ", "T") + "Z";
};
type Props = {
  episode: Episode;
  onPress: () => void;

};


export const EpisodeCard = ({ episode, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image source={{ uri: episode.coverImageUrl }} style={styles.image} />

      <View style={styles.content}>
<Text style={styles.date}>
  {episode.createdAt
    ? formatDistanceToNow(parseISO(convertToISO(episode.createdAt)), { addSuffix: true })
    : "4h"}
</Text>
        <Text style={styles.title} numberOfLines={1}>{episode.title}</Text>
        <Text style={styles.artist}>{episode.tags}</Text>
      </View>



    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: "#ddd",
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  date: {
    fontSize: 12,
    color: "#888",
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },
  artist: {
    fontSize: 14,
    color: "#666",
  },
  actions: {
    marginLeft: 12,
    justifyContent: "space-between",
    alignItems: "center",
    height: 64,
  },
  icon: {
    marginBottom: 8,
  },
});
