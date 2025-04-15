/* 
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

export default HomeScreen; */
import React from "react";
import { View, ScrollView, ActivityIndicator, Text } from "react-native";
import { usePodcasts } from "@/hooks/usePodcasts";
import RecentlyPlayed from "@/components/RecentlyPlayed";
import ToGetStarted from "@/components/ToGetStarted";
import TrySomethingElse from "@/components/TrySomethingElse";
import TodayBiggestHits from "@/components/TodayBiggestHits";
import { TracksList } from "@/components/TracksList";

const HomeScreen = () => {
  const { podcasts, loading, error } = usePodcasts();

  // Log des informations de podcast, loading et error
  console.log("Loading:", loading);
  console.log("Podcasts:", podcasts);
  console.log("Error:", error);

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
      ) : error ? (
        <Text style={{ textAlign: "center", color: "red" }}>{error}</Text>
      ) : (
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ paddingHorizontal: 10 }}>
          {/* Affichage de la liste des podcasts */}
    {/*       <TracksList data={podcasts} /> */}
          
          {/* Logs pour vérifier les données passées à chaque composant */}
          {podcasts && podcasts.length > 0 ? (
            <>
              <RecentlyPlayed podcasts={podcasts} />
              <ToGetStarted podcasts={podcasts} />
              <TrySomethingElse podcasts={podcasts} />
              <TodayBiggestHits podcasts={podcasts} />
            </>
          ) : (
            <Text style={{ textAlign: "center", marginTop: 20 }}>No podcasts available</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default HomeScreen;
