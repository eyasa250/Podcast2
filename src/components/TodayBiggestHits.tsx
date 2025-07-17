// TodayBiggestHits.tsx
import React from "react";
import { View, Text, ScrollView } from "react-native";
import { PodcastGrid } from "./PodcastGrid";

const TodayBiggestHits = ({ data }: { data: any[] }) => {
  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 10 }}>
        Today’s Biggest Hits
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <PodcastGrid data={data}horizontal  />
      </ScrollView>
    </View>
  );
};

export default TodayBiggestHits;
