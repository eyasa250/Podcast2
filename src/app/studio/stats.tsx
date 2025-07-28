import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function StudioStats() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Statistiques</Text>
      {/* Tu peux insérer ici un graphique ou des KPIs */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
        paddingTop: 60,  // <-- augmente ici la valeur pour plus d’espace en haut
    paddingBottom: 40, 
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
