import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { PodcastDetail } from "@/components/PodcastDetail";
import { ActivityIndicator, View, Text } from "react-native";
import { fetchPodcastDetails } from "@/store/slices/podcastSlice";
import { clearEpisodes, fetchEpisodesByPodcast } from "@/store/slices/episodeSlice";

export default function PodcastDetailScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedId, selected, loading, error } = useSelector(
    (state: RootState) => state.podcasts
  );

  useEffect(() => {

    if (selectedId) {
      dispatch(clearEpisodes()); 
      dispatch(fetchPodcastDetails(selectedId));
       dispatch(fetchEpisodesByPodcast(selectedId));
    }
  }, [selectedId]);

  if (!selectedId) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Aucun podcast sélectionné</Text>
      </View>
    );
  }

  if (loading || !selected) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

return <PodcastDetail />;}
