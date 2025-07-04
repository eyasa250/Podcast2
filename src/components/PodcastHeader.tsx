import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { colors } from "@/core/theme";

export function PodcastHeader({ coverImage, title, description, author, subscriberCount }: any) {
  return (
    <View>
      <Image
            // source={{ uri: coverImage || "https://via.placeholder.com/500" }}
 
        source={require("@/assets/podcast.png")}
        style={styles.coverImage}
        resizeMode="cover"
      />
      <View style={styles.headerContent}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{description}</Text>
        <Text style={styles.madeFor}>{author}</Text>
        <Text style={{ color: "#000", fontSize: 14, marginTop: 4 }}>
          {subscriberCount !== null ? `${subscriberCount} abonnés` : "Chargement..."}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  coverImage: {
    width: "100%",
    height: 200, // Hauteur de ton image
  },
  headerContent: {
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    color: "#000",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    color: "#666",
    fontSize: 16,
  },
  madeFor: {
    color: colors.primary,
    fontSize: 12,
  },
});
