// components/StatCard.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface StatCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  value: number;
  color?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ icon, title, value, color = "#4B9CD3" }) => {
  return (
    <View style={[styles.card, { backgroundColor: color }]}>
      <Ionicons name={icon} size={28} color="#fff" />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 150,
    height: 120,
    margin: 8,
    padding: 16,
    borderRadius: 12,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  title: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
    marginTop: 8,
  },
  value: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
});
