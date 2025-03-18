import React from "react";
import { View, ScrollView } from "react-native";
import { TracksList } from "@/components/TracksList";
import library from "@/assets/library.json";

const HomeScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ paddingHorizontal: 10 }}
      >
        <TracksList data={library} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
