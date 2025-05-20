import React from "react";
import { View, ScrollView, ActivityIndicator, Text } from "react-native";
import { usePodcasts } from "@/hooks/usePodcasts";
import RecentlyPlayed from "@/components/RecentlyPlayed";
import ToGetStarted from "@/components/ToGetStarted";
import TrySomethingElse from "@/components/TrySomethingElse";
import TodayBiggestHits from "@/components/TodayBiggestHits";

const HomeScreen = () => {
  const { podcasts, loading, error } = usePodcasts({ own: false });

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
      ) : error ? (
        <Text style={{ textAlign: "center", color: "red" }}>{error}</Text>
      ) : (
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ paddingHorizontal: 10 }}>
          {podcasts && podcasts.length > 0 ? (
            <>
              <RecentlyPlayed data={podcasts} />
              <ToGetStarted data={podcasts} />
              <TrySomethingElse data={podcasts} />
              <TodayBiggestHits data={podcasts} />
            </>
          ) : (
            <Text style={{ textAlign: "center", marginTop: 20 }}>No podcasts available</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default HomeScreen;
