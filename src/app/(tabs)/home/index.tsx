/* import React from "react";
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
 */
import React from "react";
import { View, ScrollView, ActivityIndicator, Text } from "react-native";
import { TracksList } from "@/components/TracksList";
import { usePodcasts } from "@/hooks/usePodcasts";

const HomeScreen = () => {
  const { podcasts, loading, error } = usePodcasts();

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
      ) : error ? (
        <Text style={{ textAlign: "center", color: "red" }}>{error}</Text>
      ) : (
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ paddingHorizontal: 10 }}>
          <TracksList data={podcasts} />
        </ScrollView>
      )}
    </View>
  );
};

export default HomeScreen;
