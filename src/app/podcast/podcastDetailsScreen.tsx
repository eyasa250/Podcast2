import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { PodcastDetail } from "@/components/PodcastDetail";

export default function PodcastDetailScreen() {
  const { id } = useLocalSearchParams();

  const podcastId = Array.isArray(id) ? id[0] : id;
console.log("podcast id passe:", podcastId);
  return (
    <PodcastDetail
      podcastId={podcastId}
    />
  );
}
