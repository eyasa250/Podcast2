import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
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

interface SubtitleTrack {
  title: string;
  language: ISO639_1;
  type: TextTrackType;
  uri: string;
}

const BASE_URL = Constants.expoConfig?.extra?.apiUrl ; // idéalement depuis .env

const PlayerScreen = () => {
  const { top, bottom } = useSafeAreaInsets();
  const modalRef = useRef<Modalize>(null);
  const activeTrack = useActiveTrack();
  const { TotalEpisodesViews, newView } = useView();

  // Récupère l'épisode sélectionné depuis Redux
  const episode = useSelector((state: RootState) => state.episodes.selected);

  // Si aucun épisode sélectionné, afficher un message simple
  if (!episode) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: "white" }}>Aucun épisode sélectionné.</Text>
      </View>
    );
  }

  const [episodeViews, setEpisodeViews] = useState<number>(0);
  const hasFetchedViews = useRef(false);

  // Sécuriser parsing des sous-titres
const parsedSubtitles = episode.transcriptionUrls ?? {};


  const subtitles: SubtitleTrack[] = Object.entries(parsedSubtitles).map(
    ([lang, uri]) => ({
      title: lang.toUpperCase(),
      language: lang as ISO639_1,
      type: TextTrackType.VTT,
      uri: uri as string,
    })
  );

  // Fetch des vues une seule fois
  useEffect(() => {
    if (hasFetchedViews.current) return;

    const fetchViews = async () => {
      await newView(episode.id); // Incrémente la vue
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

  // Gérer URL vidéo
  const videoSourceUrl = episode.videoUrl?.startsWith("http")
    ? episode.videoUrl
    : `${BASE_URL}${episode.videoUrl}`;

  const openModal = () => {
    requestAnimationFrame(() => {
      modalRef.current?.open();
    });
  };

  // Récupère le titre et artiste pour le modal d'options (activeTrack ou fallback)
  const trackTitle = activeTrack?.title ?? episode.title;
  const trackArtist = activeTrack?.artist ?? episode.podcast;

  // Charger épisodes du même podcast pour afficher en dessous
  const { episodes } = useEpisodes(
    episode.podcastId ? { podcastId: episode.podcastId, favorites: false } : { favorites: false }
  );

  return (
    <LinearGradient style={{ flex: 1 }} colors={["#000", "#000"]}>
      <View style={{ paddingTop: top + 40, paddingBottom: bottom + 20 }}>
        {/* Header */}
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

      {/* Player */}
      {videoSourceUrl ? (
        <VideoPlayer url={videoSourceUrl} textTracks={subtitles} />
      ) : (
        <Text style={{ color: "white", textAlign: "center", marginVertical: 20 }}>
          Aucune vidéo disponible
        </Text>
      )}

      {/* Infos épisode */}
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={styles.detailsContainer}>
            <Text style={styles.episodeTitle}>{episode.title}</Text>
            <Text style={styles.episodeViews}>{episodeViews} vues</Text>
            <Text style={styles.episodeDescription}>{episode.description}</Text>
          </View>
        </ScrollView>

        <Text style={styles.sectionTitle}>Autres épisodes</Text>
        <EpisodeList data={episodes ?? []} />
      </View>

      {/* Options du track */}
      {activeTrack && (
        <TrackOptionsModal
          ref={modalRef}
          trackTitle={trackTitle}
          artist={trackArtist}
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
