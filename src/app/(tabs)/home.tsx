import React, { useEffect } from "react";
import { View, FlatList, ActivityIndicator, Text } from "react-native";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { fetchAllPodcasts, fetchRecommendedPodcasts } from "@/store/slices/podcastSlice";
import RecentlyPlayed from "@/components/RecentlyPlayed";
import ToGetStarted from "@/components/ToGetStarted";
import TrySomethingElse from "@/components/TrySomethingElse";
import TodayBiggestHits from "@/components/TodayBiggestHits";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ⚡️ nouvelle section avec podcasts recommandés
import RecommendedPodcasts from "@/components/RecommendedPodcasts";

const sections = [
  { key: "recently", component: RecentlyPlayed },
  { key: "toGetStarted", component: ToGetStarted },
  { key: "trySomethingElse", component: TrySomethingElse },
  { key: "todayBiggestHits", component: TodayBiggestHits },
  { key: "recommended", component: RecommendedPodcasts }, // 👈 ajout ici
];

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const { allpod, recommendedPodcasts, loading, error } = useAppSelector((state) => state.podcasts);

  useEffect(() => {
    dispatch(fetchAllPodcasts());

    // récupérer userId pour charger les recommandations
    const loadRecommended = async () => {
      const userJson = await AsyncStorage.getItem("user");
      const user = userJson ? JSON.parse(userJson) : null;
      if (user?.id) {
        dispatch(fetchRecommendedPodcasts(user.id));
      }
    };

    loadRecommended();
  }, [dispatch]);

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

        // 👇 injecter les bons data selon la section
        let data = allpod;
        if (item.key === "recommended") {
          data = recommendedPodcasts;
        }

        return <SectionComponent data={data} />;
      }}
    />
  );
};

export default HomeScreen;
