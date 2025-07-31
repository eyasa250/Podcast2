import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from "react-native";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { fetchStatsForPodcaster, fetchViewsByCategoryThunk } from "@/store/slices/podcastSlice";
import { StatCard } from "@/components/StatCard";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { PieChartComponent } from "@/components/PieChartComponent";
import theme from "@/core/theme";

const StatsScreen = () => {
  const dispatch = useAppDispatch();
  const { stats, loading, error ,viewsByCategory } = useAppSelector((state) => state.podcasts);

useEffect(() => {
  dispatch(fetchStatsForPodcaster());
  
}, []);

  useEffect(() => {
    dispatch(fetchViewsByCategoryThunk());
  }, []);


// useEffect(() => {
//   dispatch(fetchStatsForPodcast(podcastId));
// }, [podcastId]);

  if (loading) return <ActivityIndicator size="large" color="#000" />;
  if (error) return <Text >Erreur : {error}</Text>;
  if (!stats) return <Text>no data </Text>;

  return (
  <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Vos Statistiques</Text>
      <View style={styles.cardsWrapper}>
        <StatCard icon="mic" title="Podcasts" value={stats.totalPodcasts} color="#4B9CD3" />
        <StatCard icon="musical-notes" title="Épisodes" value={stats.totalEpisodes} color="#6A4BBC" />
        <StatCard icon="people" title="Abonnés" value={stats.totalSubscribers ?? 0} color="#E27D60" />
        <StatCard icon="headset" title="Écoutes" value={stats.totalViews ?? 0} color="#85C1E9" />
    < StatCard
          icon="time"
          title="Temps total écouté"
          value={formatDuration(stats.totalListenedDuration)}
          color="#FFA07A"
        />
        <StatCard
          icon="timer"
          title="Durée moyenne"
          value={formatDuration(stats.averageDuration)}
          color="#FFD700"
        />
        <StatCard
          icon="stats-chart"
          title="Taux de complétion"
          value={`${stats.completionRate?.toFixed(1)} %`}
          color="#98FB98"
        />
      </View>
<Text style={{ fontSize: 18, marginVertical: 12 }}>Évolution des écoutes</Text>

{stats.monthlyViews && stats.monthlyViews.length > 0 ? (
<LineChart
  data={{
    labels: stats.monthlyViews.map((item) => item.month),
    datasets: [
      {
        data: stats.monthlyViews.map((item) => item.count),
        color: () => "#4B9CD3", // Couleur uniforme
        strokeWidth: 2,
      },
    ],
    legend: ["Écoutes par mois"],
  }}
  width={Dimensions.get("window").width - 32}
  height={250}
  yAxisLabel=""
  fromZero={true}
  chartConfig={{
    backgroundColor:theme.colors.background,
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(75, 156, 211, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    propsForDots: {
      r: "4",
      strokeWidth: "2",
      stroke: "#4B9CD3",
    },
    propsForBackgroundLines: {
      strokeDasharray: "", // lignes continues
    },
  }}
  bezier // ligne courbée
  style={{
    marginVertical: 8,
    borderRadius: 16,
  }}
/>

) : (
  <Text style={{ textAlign: "center", color: "#888" }}>
    Pas encore de données d'écoute.
  </Text>
)}
 {viewsByCategory && viewsByCategory.length > 0 ? (
  <PieChartComponent data={viewsByCategory} />
) : (
  <Text style={{ textAlign: "center", color: "#888", marginVertical: 12 }}>
    Pas encore de données de répartition par catégorie.
  </Text>
)} 

    </ScrollView>
  );
};

function formatDuration(seconds: number) {
  if (!seconds) return "0 min";
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins} min ${secs} sec`;
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  cardsWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});

export default StatsScreen;
