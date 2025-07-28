import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { PodcastGrid } from "@/components/PodcastGrid";
import { useAppSelector } from "@/hooks/reduxHooks";

export default function StudioDashboard() {
  const router = useRouter();
        const { mine } = useAppSelector((state) => state.podcasts);
  
  const dataWithAddNew = [...mine, { id: "add-new", isAddNew: true }];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🎙️ My Studio</Text>

      <View style={styles.cardContainer}>
        
        {/* <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/studio/podcast/podcastList")}
          accessibilityLabel="Manage my podcasts"
        >
          <FontAwesome5 name="podcast" size={28} color="#444" />
          <Text style={styles.cardText}>My podcasts</Text>
        </TouchableOpacity> */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Podcasts</Text>
         <PodcastGrid data={dataWithAddNew} horizontal onAddPress={() =>  router.push("/studio/podcast/PodcastFormScreen")
         }
 />
        </View>
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/studio/StatsScreen")}
          accessibilityLabel="Voir les statistiques"
        >
          <Ionicons name="stats-chart" size={28} color="#444" />
          <Text style={styles.cardText}>statistics</Text>
        </TouchableOpacity>


      
      </View>

      <View style={styles.summaryBoxContainer}>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryLabel}>Total Épisodes</Text>
          <Text style={styles.summaryValue}>12</Text>
        </View>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryLabel}>Total Vues</Text>
          <Text style={styles.summaryValue}>4560</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,  // <-- augmente ici la valeur pour plus d’espace en haut
    paddingBottom: 40,    backgroundColor: "#f5f5f5",
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#222",
  },
  cardContainer: {
    marginBottom: 30,
  },
  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 12,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardText: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 12,
    color: "#333",
  },
  summaryBoxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summaryBox: {
    backgroundColor: "#e0e0e0",
    borderRadius: 12,
    padding: 16,
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#555",
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 4,
    color: "#111",
  }, section: {
    paddingHorizontal: 10,
    paddingTop: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
});
