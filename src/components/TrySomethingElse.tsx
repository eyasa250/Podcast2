// TrySomethingElse.tsx
import React from "react";
import { View, Text, ScrollView } from "react-native";
import { TracksList } from "@/components/TracksList";
import library from "@/assets/library.json";  // Personnalisez ici aussi

const TrySomethingElse = ({ podcasts }: { podcasts: any[] }) => {
  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 10 }}>
        Try Something Else
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TracksList data={podcasts} />
      </ScrollView>
    </View>
  );
};

export default TrySomethingElse;