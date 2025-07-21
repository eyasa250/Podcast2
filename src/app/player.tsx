import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Modalize } from "react-native-modalize";
import { TrackOptionsModal } from "@/components/TrackOptionsModal";
import { VideoPlayer } from "@/components/VideoPlayer";
import { useActiveTrack } from "react-native-track-player";
import { ISO639_1, TextTrackType } from "react-native-video";
import { EpisodeList } from "@/components/EpisodeList";
import { useEpisodes } from "@/hooks/useEpisods";
import { useView } from "@/hooks/useView";
import Constants from "expo-constants";
import { AudioPlayer } from "@/components/AudioPlayer";
import TrackPlayer from "react-native-track-player";
import { useSetupTrackPlayer } from "@/hooks/useSetupTrackPlayer";

interface SubtitleTrack {
  title: string;
  language: ISO639_1;
  type: TextTrackType;
  uri: string;
}

const BASE_URL = Constants.expoConfig?.extra?.apiUrl;

const PlayerScreen = () => {
  // --- Hooks de layout & refs ---
  const { top, bottom } = useSafeAreaInsets();
  const modalRef = useRef<Modalize>(null);
  const activeTrack = useActiveTrack();
  const { TotalEpisodesViews, newView } = useView();

  // --- Récupération de l'épisode sélectionné dans le store Redux ---
  const episode = useSelector((state: RootState) => state.episodes.selected);

  // --- Gestion de l'absence d'épisode sélectionné ---
  if (!episode) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: "white" }}>Aucun épisode sélectionné.</Text>
      </View>
    );
  }

  // --- State pour le nombre de vues de l’épisode ---
  const [episodeViews, setEpisodeViews] = useState<number>(0);
  const hasFetchedViews = useRef(false);

  // --- Détection du type média : audio ou vidéo ---
  const isAudio = !!episode.audioUrl;
  const isVideo = !!episode.videoUrl;

  // --- Construction des URLs complètes des médias ---
  const audioSourceUrl = episode.audioUrl?.startsWith("http")
    ? episode.audioUrl
    : `${BASE_URL}${episode.audioUrl}`;
  const coverSourceUrl = episode.coverImageUrl?.startsWith("http")
    ? episode.coverImageUrl
    : `${BASE_URL}${episode.coverImageUrl}`;
  const videoSourceUrl = episode.videoUrl?.startsWith("http")
    ? episode.videoUrl
    : `${BASE_URL}${episode.videoUrl}`;

  // --- Préparation des pistes de sous-titres ---
  const parsedSubtitles = episode.transcriptionUrls ?? {};
  const subtitles: SubtitleTrack[] = Object.entries(parsedSubtitles).map(
    ([lang, uri]) => ({
      title: lang.toUpperCase(),
      language: lang as ISO639_1,
      type: TextTrackType.VTT,
      uri: uri as string,
    })
  );

  // --- Effet pour récupérer et afficher le nombre de vues ---
  useEffect(() => {
    if (hasFetchedViews.current) return;

    const fetchViews = async () => {
      await newView(episode.id);
      const total = await TotalEpisodesViews(episode.id);
      if (typeof total === "number") {
        setEpisodeViews(total);
      } else if (total?.total) {
        setEpisodeViews(total.total);
      }
      hasFetchedViews.current = true;
    };

    fetchViews();
  }, [episode.id, newView, TotalEpisodesViews]);

  // --- Initialisation du player audio ---
  useSetupTrackPlayer();

  // --- Effet pour gérer le chargement et la lecture audio ---
  useEffect(() => {
    let isMounted = true;

    console.log('Audio URL:', audioSourceUrl);

    const setupAudio = async () => {
      try {
        if (isAudio && audioSourceUrl && isMounted) {
          await TrackPlayer.reset();
          await TrackPlayer.add({
            id: episode.id.toString(),
            url: audioSourceUrl,
            title: episode.title,
            artist:
              typeof episode.podcast === "string"
                ? episode.podcast
                : episode.podcast?.title || "Inconnu",
            artwork: coverSourceUrl,
          });
          await TrackPlayer.play();
        } else if (!isAudio) {
          await TrackPlayer.pause(); // Stop playback if it's not audio
        }
      } catch (error) {
        console.error("Erreur TrackPlayer:", error);
      }
    };

    setupAudio();

    return () => {
      isMounted = false;
    };
  }, [episode, isAudio]);

  // --- Fonction pour ouvrir le modal d’options du track ---
  const openModal = () => {
    requestAnimationFrame(() => {
      modalRef.current?.open();
    });
  };

  // --- Titres affichés dans le player (audio) ---
  const trackTitle = activeTrack?.title ?? episode.title;
  const trackArtist = activeTrack?.artist ?? episode.podcast;

  // --- Chargement des autres épisodes du podcast ---
  const { episodes } = useEpisodes(
    episode.podcastId
      ? { podcastId: episode.podcastId, favorites: false }
      : { favorites: false }
  );

  return (
    <LinearGradient style={{ flex: 1 }} colors={["#000", "#000"]}>
      {/* --- Header avec bouton retour et options --- */}
      <View style={{ paddingTop: top + 40, paddingBottom: bottom + 20 }}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.back()}>
            <FontAwesome6 name="arrow-left" size={25} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle} numberOfLines={1}>
            Lecture en cours
          </Text>
          <TouchableOpacity onPress={openModal}>
            <FontAwesome6 name="ellipsis-vertical" size={25} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* --- Zone de lecture : vidéo, audio ou message d’absence de contenu --- */}
      {isVideo && videoSourceUrl ? (
        <VideoPlayer url={videoSourceUrl} textTracks={subtitles} />
      ) : isAudio && audioSourceUrl ? (
          <View style={{ paddingBottom: 30 }}>
            <AudioPlayer />
          </View>   
             ) : (
        <Text
          style={{ color: "white", textAlign: "center", marginVertical: 20 }}
        >
          Aucun contenu disponible
        </Text>
      )}

      {/* --- Informations détaillées sur l’épisode --- */}
      <View style={{ flex: 1 }}>
        <ScrollView>
  {isVideo && (
  <View style={styles.detailsContainer}>
    <Text style={styles.episodeTitle}>{episode.title}</Text>
    <Text style={styles.episodeViews}>{episodeViews} vues</Text>
    <Text style={styles.episodeDescription}>{episode.description}</Text>
  </View>
)}
        {/* --- Liste des autres épisodes --- */}
         <EpisodeList data={episodes ?? []} />
                </ScrollView>

      </View>

      {/* --- Modal d’options du track si un track actif est présent --- */}
      {activeTrack && (
        <TrackOptionsModal
          ref={modalRef}
          trackTitle={trackTitle}
          // artist={trackArtist} // optionnel
          onLike={() => console.log("💖 Liked track")}
          onAddTopodcast={() => console.log("➕ Added to podcast")}
        />
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    marginHorizontal: 16,
  },
  episodeViews: {
    color: "#aaa",
    fontSize: 12,
    marginBottom: 4,
  },
  detailsContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  episodeTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  episodeDescription: {
    color: "#ccc",
    fontSize: 14,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
});

export default PlayerScreen;
