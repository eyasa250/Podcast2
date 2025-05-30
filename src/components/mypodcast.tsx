import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { PodcastGrid } from "@/components/PodcastGrid";
import { Podcast } from "@/types";

type Props = {
  podcasts: Podcast[];
  loading?: boolean;
  error?: string;
  onAddPress: () => void;
};

export const MyPodcast = ({ podcasts, loading, error, onAddPress }: Props) => {

  if (loading) return <Text>Loading your podcasts...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  const dataWithAddNew = [...podcasts, { id: "add-new", isAddNew: true }];

  return (
    <View style={styles.container}>
      <PodcastGrid data={dataWithAddNew} onAddPress={onAddPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 100,
    right: 20,
    alignItems: "center",
  },
});
