import React, { useEffect } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { PodcastGrid } from "@/components/PodcastGrid";
import { fetchMyPodcasts, fetchSubscriptions, setSelectedPodcastId } from "@/store/slices/podcastSlice";

const PodcastListScreen = () => {
  const { type } = useLocalSearchParams();
  const dispatch = useAppDispatch();

  const { mine, subscriptions, loading } = useAppSelector((state) => state.podcasts);

  useEffect(() => {
    if (type === "own") {
      dispatch(fetchMyPodcasts());
    } else if (type === "subscriptions") {
      dispatch(fetchSubscriptions());
    }
  }, [type]);

  const isSubscriptions = type === "subscriptions";

const list = isSubscriptions
  ? subscriptions
  : [...mine, { id: 'add-new', isAddNew: true }];

  const title = isSubscriptions ? "My Subscriptions" : "Mes Podcasts";
  const handlePress = (podcast: any) => {
    if (podcast.isAddNew) {
      router.push("/podcast/PodcastFormScreen");
    } else {
      dispatch(setSelectedPodcastId(podcast.id));
      router.push("/podcast/podcastDetailsScreen");
    }
  };
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>{title}</Text>

        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <PodcastGrid
            data={list}
            onAddPress={() => router.push("/podcast/PodcastFormScreen")}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default PodcastListScreen;
