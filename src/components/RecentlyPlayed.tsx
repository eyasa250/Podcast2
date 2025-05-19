// RecentlyPlayed.tsx
import React from "react";
import { View, Text, ScrollView } from "react-native";
import { EpisodeList } from "@/components/EpisodeList";
import library from "@/assets/library.json";  // Vous pouvez personnaliser les données ici

const RecentlyPlayed = ({ data }: { data: any[] }) => {
  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 10 }}>
        Recently Played
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <EpisodeList data={data} />
      </ScrollView>
    </View>
  );
};

export default RecentlyPlayed;



