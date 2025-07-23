import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { FontAwesome, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { Episode } from "@/types";
import { useAuth } from "@/hooks/useAuth";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { generateEpisodeSubtitles, enhanceEpisodeAudio } from "@/store/slices/episodeSlice";
import { router } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { setEditEpisode } from "@/store/slices/editEpisodeSlice";
import Constants from "expo-constants";
import { formatDistanceToNow, parseISO } from "date-fns";

const convertToISO = (dateString: string) => {
  return dateString.replace(" ", "T") + "Z";
};
interface Props {
  episode: Episode;
  onPress?: () => void;
}
const BASE_URL = Constants.expoConfig?.extra?.apiUrl;

export const EpisodeCard = ({ episode, onPress }: Props) => {
  
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const isOwner = episode.podcast?.userId === user?.id;

    const artworkUri = episode.coverImageUrl?.startsWith('http')
    ? episode.coverImageUrl
    : `${BASE_URL}${episode.coverImageUrl}`;

const handleEditEpisodes = () => {
  dispatch(setEditEpisode(episode)); // On passe l'objet complet
  router.push("/podcast/EditEpisodeScreen");
};

  const handleGenerateSubtitles = () => {
    Alert.alert(
      "Ajouter des sous-titres",
      "Voulez-vous vraiment ajouter des sous-titres à cet épisode ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Confirmer",
          onPress: () => {
            dispatch(generateEpisodeSubtitles(episode.id));
          },
        },
      ]
    );
  };

  const handleEnhanceAudio = () => {
    Alert.alert(
      "Amélioration audio",
      "Voulez-vous appliquer une amélioration du son à cet épisode ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Confirmer",
          onPress: () => {
            dispatch(enhanceEpisodeAudio(episode.id));
          },
        },
      ]
    );
  };

  return (
    
    <View style={styles.container}>
      <Text style={styles.date}>
  {episode.createdAt
    ? formatDistanceToNow(parseISO(convertToISO(episode.createdAt)), { addSuffix: true })
    : "4h"}
</Text>
      {/* Bouton Lecture */}
      <TouchableOpacity onPress={onPress} style={styles.playButton}>
        <FontAwesome name="play-circle" size={28} color="#4caf50" />
      </TouchableOpacity>

      {/* Texte */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{episode.title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {episode.description}
        </Text>
      </View>

      {/* Icônes à droite */}
      <View style={styles.rightIcons}>
     
          <View style={styles.ownerOptions}>
              <TouchableOpacity onPress={handleEditEpisodes}>
              <MaterialIcons name="edit" size={24} color="#555" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleGenerateSubtitles}>
              <MaterialIcons name="subtitles" size={24} color="#555" />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleEnhanceAudio} style={{ marginLeft: 8 }}>
              <Ionicons name="sparkles-outline" size={24} color="#555" />
            </TouchableOpacity>
          </View>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    elevation: 2,
    marginBottom: 8,
  },
  playButton: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 4,
  },
  description: {
    color: "#666",
    fontSize: 13,
  },
  rightIcons: {
    marginLeft: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  ownerOptions: {
    flexDirection: "row",
    gap: 8,
  },  date: {
    fontSize: 12,
    color: "#888",
    marginBottom: 4,
  },
});
