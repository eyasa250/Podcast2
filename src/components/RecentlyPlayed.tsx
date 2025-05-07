// RecentlyPlayed.tsx
import React from "react";
import { View, Text, ScrollView } from "react-native";
import { TracksList } from "@/components/TracksList";
import library from "@/assets/library.json";  // Vous pouvez personnaliser les données ici

const RecentlyPlayed = ({ episods }: { episods: any[] }) => {
  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 10 }}>
        Recently Played
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TracksList data={episods} />
      </ScrollView>
    </View>
  );
};

export default RecentlyPlayed;



