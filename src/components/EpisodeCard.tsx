import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import {
  FontAwesome,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
import { Episode } from "@/types";
import { useAuth } from "@/hooks/useAuth";
import { useAppDispatch } from "@/hooks/reduxHooks";
import {
  generateEpisodeSubtitles,
  enhanceEpisodeAudio,
} from "@/store/slices/episodeSlice";
import { router } from "expo-router";
import { setEditEpisode } from "@/store/slices/editEpisodeSlice";
import Constants from "expo-constants";
import { formatDistanceToNow, parseISO } from "date-fns";
import { useAppSelector } from "@/hooks/reduxHooks";
import {
  markEpisodeAsFavorite,
  unmarkEpisodeAsFavorite,
} from "@/store/slices/episodeSlice";

interface Props {
  episode: Episode;
  onPress?: () => void;
}

const BASE_URL = Constants.expoConfig?.extra?.apiUrl;

const convertToISO = (dateString: string) => {
  return dateString.replace(" ", "T") + "Z";
};

export const EpisodeCard = ({ episode, onPress }: Props) => {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const isOwner = episode.podcast?.userId === user?.id;
const favorites = useAppSelector((state) => state.episodes.favorites);
const isFavorite = favorites.some((fav) => fav.id === episode.id);

const toggleFavorite = () => {
  if (!user) {
    Alert.alert("Connexion requise", "Vous devez être connecté pour ajouter un favori.");
    console.log("⚠️ Tentative d'ajout sans être connecté");
    return;
  }

  if (isFavorite) {
    console.log(`➖ Retrait de l’épisode ${episode.id} des favoris`);
    dispatch(unmarkEpisodeAsFavorite(episode.id));
  } else {
    console.log(`➕ Ajout de l’épisode ${episode.id} aux favoris`);
    dispatch(markEpisodeAsFavorite(episode.id));
  }
};


  const artworkUri = episode.coverImageUrl?.startsWith("http")
    ? episode.coverImageUrl
    : `${BASE_URL}${episode.coverImageUrl}`;

  const handleEditEpisodes = () => {
    dispatch(setEditEpisode(episode));
    router.push("/studio/episode/EditEpisodeScreen");
  };

  const handleGenerateSubtitles = () => {
    Alert.alert("Ajouter des sous-titres", "Voulez-vous vraiment ajouter des sous-titres à cet épisode ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Confirmer",
        onPress: () => dispatch(generateEpisodeSubtitles(episode.id)),
      },
    ]);
  };

  const handleEnhanceAudio = () => {
    Alert.alert("Amélioration audio", "Voulez-vous améliorer l’audio de cet épisode ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Confirmer",
        onPress: () => dispatch(enhanceEpisodeAudio(episode.id)),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Image de l’épisode */}
      <Image source={{ uri: artworkUri }} style={styles.image} />

      {/* Contenu principal : titre, description, date */}
      <View style={styles.content}>
        <Text style={styles.title}>{episode.title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {episode.description}
        </Text>
        <Text style={styles.date}>
          {episode.createdAt
            ? formatDistanceToNow(parseISO(convertToISO(episode.createdAt)), {
                addSuffix: true,
              })
            : "il y a un moment"}
        </Text>
      </View>

      {/* Boutons actions à droite */}
      <View style={styles.actions}>
        <TouchableOpacity onPress={onPress} style={styles.iconButton}>
          <FontAwesome name="play-circle" size={26} color="#4caf50" />
        </TouchableOpacity>

        {isOwner ? (
          <>
            <TouchableOpacity onPress={handleEditEpisodes} style={styles.iconButton}>
              <MaterialIcons name="edit" size={24} color="#555" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleGenerateSubtitles} style={styles.iconButton}>
              <MaterialIcons name="subtitles" size={24} color="#555" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleEnhanceAudio} style={styles.iconButton}>
              <Ionicons name="sparkles-outline" size={24} color="#555" />
            </TouchableOpacity>
          </>
        ) : (
    <TouchableOpacity onPress={toggleFavorite} style={styles.iconButton}>
  <Ionicons
    name={isFavorite ? "heart" : "heart-outline"}
    size={24}
    color="#e91e63"
  />
</TouchableOpacity>

        )}
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
    elevation: 3,
    marginBottom: 10,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: "#eee",
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  description: {
    color: "#555",
    fontSize: 13,
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: "#999",
  },
  actions: {
    flexDirection: "column",
    alignItems: "center",
    marginLeft: 10,
    gap: 8,
  },
  iconButton: {
    padding: 4,
  },
});
