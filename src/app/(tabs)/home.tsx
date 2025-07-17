import React, { useEffect } from "react";
import { View, FlatList, ActivityIndicator, Text } from "react-native";
import { usePodcasts } from "@/hooks/usePodcasts";
import RecentlyPlayed from "@/components/RecentlyPlayed";
import ToGetStarted from "@/components/ToGetStarted";
import TrySomethingElse from "@/components/TrySomethingElse";
import TodayBiggestHits from "@/components/TodayBiggestHits";
import { useEpisodes } from "@/hooks/useEpisods";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { fetchAllPodcasts } from "@/store/slices/podcastSlice";

const sections = [
  { key: "recently", component: RecentlyPlayed, },
  { key: "toGetStarted", component: ToGetStarted,},
  { key: "trySomethingElse", component: TrySomethingElse,},
  { key: "todayBiggestHits", component: TodayBiggestHits, },
];

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const { allpod, loading, error } = useAppSelector((state) => state.podcasts);

  useEffect(() => {
    dispatch(fetchAllPodcasts());
  }, []); 
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />;
  }

  if (error) {
    return <Text style={{ textAlign: "center", color: "red" }}>{error}</Text>;
  }

  if (!allpod || allpod.length === 0) {
    return <Text style={{ textAlign: "center", marginTop: 20 }}>No podcasts available</Text>;
  }

  return (
    <FlatList
      data={sections}
      keyExtractor={(item) => item.key}
      contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 20 }}
      renderItem={({ item }) => {
        const SectionComponent = item.component;
        return (
           
            <SectionComponent data={allpod} />
        );
      }}
    />
  );
};

export default HomeScreen;
