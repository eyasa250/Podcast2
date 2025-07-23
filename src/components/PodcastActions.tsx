import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Feather } from "@expo/vector-icons";

export function PodcastActions({ isOwner, onAddEpisode, onSubscribe, subscribing, isSubscribed, subscriberCount , onEditPodcast}: any) {
  return (
    <View style={styles.buttonRow}>
      <TouchableOpacity style={styles.iconButton}>
        <Feather name="share-2" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton}>
        <Feather name="download" size={24} color="white" />
      </TouchableOpacity>

      {isOwner ? (
        <>
          <TouchableOpacity style={styles.iconButton} onPress={onAddEpisode}>
            <Feather name="plus" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton} onPress={onEditPodcast}>
            <Feather name="edit-2" size={24} color="white" />
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity style={styles.iconButton} onPress={onSubscribe} disabled={subscribing}>
          <Feather name={isSubscribed ? "user-check" : "user-plus"} size={24} color="white" />
        </TouchableOpacity>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
    alignItems: "center",
  },
  iconButton: {
    backgroundColor: "#333",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: 48,
    height: 48,
  },
  subscriberCount: {
    color: "white",
    marginLeft: 10,
    fontWeight: "bold",
  },
});
