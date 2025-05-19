import React from "react";
import { View, Text, ScrollView } from "react-native";
import { EpisodeList } from "@/components/EpisodeList";
import library from "@/assets/library.json";  // Personnalisez ici aussi

const ToGetStarted = ({ episods }: { episods: any[] }) => {
  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 10 }}>
        To Get Started
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <EpisodeList data={episods} />
      </ScrollView>
    </View>
  );
};

export default ToGetStarted;