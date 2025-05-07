
import React from "react";
import { View, ScrollView, ActivityIndicator, Text } from "react-native";
import { useEpisods } from "@/hooks/useEpisods";
import RecentlyPlayed from "@/components/RecentlyPlayed";
import ToGetStarted from "@/components/ToGetStarted";
import TrySomethingElse from "@/components/TrySomethingElse";
import TodayBiggestHits from "@/components/TodayBiggestHits";
import { TracksList } from "@/components/TracksList";

const HomeScreen = () => {
  const { Episods, loading, error } = useEpisods();


  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
      ) : error ? (
        <Text style={{ textAlign: "center", color: "red" }}>{error}</Text>
      ) : (
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ paddingHorizontal: 10 }}>
          {/* Affichage de la liste des Episods */}
    {/*       <TracksList data={Episods} /> */}
          
          {/* Logs pour vérifier les données passées à chaque composant */}
          {Episods && Episods.length > 0 ? (
            <>
              <RecentlyPlayed episods={Episods} />
              <ToGetStarted episods={Episods} />
              <TrySomethingElse episods={Episods} />
              <TodayBiggestHits episods={Episods} />
            </>
          ) : (
            <Text style={{ textAlign: "center", marginTop: 20 }}>No Episods available</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default HomeScreen;
