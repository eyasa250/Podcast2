import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import Button from "@/components/Button"; // <-- Ton bouton custom

export function PodcastActions({
  isOwner,
  onAddEpisode,
  onSubscribe,
  subscribing,
  isSubscribed,
  subscriberCount,
  onEditPodcast,
}: any) {
  return (
    <View style={styles.buttonRow}>
      {isOwner ? (
        <View style={{ flexDirection: "row", gap: 10 }}>
          <TouchableOpacity style={styles.iconButton} onPress={onAddEpisode}>
            <Feather name="plus" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton} onPress={onEditPodcast}>
            <Feather name="edit-2" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          {/* <TouchableOpacity style={styles.iconButton}>
            <Feather name="share-2" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Feather name="download" size={24} color="white" />
          </TouchableOpacity> */}

          {/* Nouveau bouton d'abonnement avec ton composant Button */}
          <Button
            mode={isSubscribed ? "outlined" : "contained"}
            icon={isSubscribed ? "account-check" : "account-plus"}
            onPress={onSubscribe}
            disabled={subscribing}
            style={{ width: 140, height: 48, justifyContent: "center" }}
          >
            {isSubscribed ? "Abonné" : "S’abonner"}
          </Button>
        </View>
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
