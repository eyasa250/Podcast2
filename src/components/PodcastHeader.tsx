import React from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";
import { colors } from "@/core/theme";

export function PodcastHeader({ coverImage, title, description, author, subscriberCount }: any) {
  return (
    <ImageBackground
      source={{ uri: coverImage || "https://via.placeholder.com/500" }}
      style={styles.header}
      blurRadius={20}
    >
      <View style={styles.headerContent}>
        <Text style={styles.playlistType}>playlist</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{description}</Text>
        <Text style={styles.madeFor}>{author}</Text>
        <Text style={{ color: "#000", fontSize: 14, marginTop: 4 }}>
          {subscriberCount !== null ? `${subscriberCount} abonnés` : "Chargement..."}
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 300,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 30,
    alignItems: "center",
  },
  headerContent: {
    padding: 16,
    backgroundColor: "#fff",
  },
  playlistType: {
    color: "#555",
    fontSize: 14,
    textTransform: "uppercase",
    fontWeight: "600",
    marginBottom: 8,
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
