import React from "react";
import { View, Text, ScrollView } from "react-native";
import { TracksList } from "@/components/TracksList";
import library from "@/assets/library.json";  // Personnalisez ici aussi

const ToGetStarted = ({ podcasts }: { podcasts: any[] }) => {
  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 10 }}>
        To Get Started
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TracksList data={podcasts} />
      </ScrollView>
    </View>
  );
};

export default ToGetStarted;