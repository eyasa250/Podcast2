// components/RecommendedPodcasts.tsx
import React from "react";
import { View, Text, ScrollView } from "react-native";
import { PodcastGrid } from "./PodcastGrid";
import { Podcast } from "@/types";

const RecommendedPodcasts = ({ data }: { data: Podcast[] }) => {
  if (!data || data.length === 0) return null;

  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginVertical: 10 }}>
        Recommended For You
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <PodcastGrid data={data} />
      </ScrollView>
    </View>
  );
};

export default RecommendedPodcasts;
