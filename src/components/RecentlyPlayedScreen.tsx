import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import RecentlyPlayedCard from "../components/RecentlyPlayedCard";

const recentlyPlayed = [
  {
    id: "1",
    title: "Six60",
    subtitle: "Artist",
    image: "https://via.placeholder.com/50",
  },
  {
    id: "2",
    title: "Someone to be around - Bo...",
    subtitle: "Song | Six60",
    image: "https://via.placeholder.com/50",
  },
];

const RecentlyPlayedScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#121212" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Recently Played</Text>
      </View>

      <Text style={styles.sectionTitle}>Yesterday</Text>

      {/* Liste des chansons */}
      <FlatList
        data={recentlyPlayed}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RecentlyPlayedCard image={item.image} title={item.title} subtitle={item.subtitle} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    color: "#121212",
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 15,
  },
  sectionTitle: {
    color: "#121212",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default RecentlyPlayedScreen;
