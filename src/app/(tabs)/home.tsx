
import React, { useEffect } from "react";
import { View, ScrollView, ActivityIndicator, Text } from "react-native";
import { useEpisodes} from "@/hooks/useEpisods";
import RecentlyPlayed from "@/components/RecentlyPlayed";
import ToGetStarted from "@/components/ToGetStarted";
import TrySomethingElse from "@/components/TrySomethingElse";
import TodayBiggestHits from "@/components/TodayBiggestHits";
import { TracksList } from "@/components/TracksList";

const HomeScreen = () => {
  const { episodes, loading, error, fetchAllEpisodes } = useEpisodes();

  useEffect(() => {
    fetchAllEpisodes();
  }, []);
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
          {episodes && episodes.length > 0 ? (
            <>
              <RecentlyPlayed episods={episodes} />
              <ToGetStarted episods={episodes} />
              <TrySomethingElse episods={episodes} />
              <TodayBiggestHits episods={episodes} />
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
function fetchAllEpisodes() {
  throw new Error("Function not implemented.");
}

