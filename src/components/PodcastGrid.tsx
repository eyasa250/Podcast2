import React from "react";
import { FlatList, View, StyleSheet, Text, Dimensions, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { PodcastGridItem } from "./PodcastGridItem";
import { Ionicons } from "@expo/vector-icons";
import { Podcast } from "@/types";
import { useDispatch } from "react-redux";
import { setSelectedPodcastId } from "@/store/slices/podcastSlice";
type AddNewItem = {
  id: string;
  isAddNew: boolean;
};

type Props = {
  data: (Podcast | AddNewItem)[];
  horizontal?: boolean;
  onAddPress?: () => void;
};

const { width } = Dimensions.get("window");
const ITEM_WIDTH = (width - 48) / 2;

export const PodcastGrid = ({ data, horizontal = false, onAddPress }: Props) => {
  const router = useRouter();


const dispatch = useDispatch();

const handlePress = (podcast: Podcast) => {
  dispatch(setSelectedPodcastId(podcast.id)); // ✅ définit l'ID sélectionné
  router.push("/podcast/podcastDetailsScreen"); // pas besoin de passer id
};

  const renderItem = ({ item }: { item: Podcast & { isAddNew?: boolean } }) => {
    if (item.isAddNew) {
      return (
        <TouchableOpacity
          style={[styles.addCard, { width: horizontal ? 140 : ITEM_WIDTH }]}
          onPress={onAddPress}
          activeOpacity={0.7}
        >
          <Ionicons name="add-circle-outline" size={48} color="#007AFF" />
          <Text style={styles.addText}>add podcast</Text>
        </TouchableOpacity>
      );
    }

    return (
      <View style={{ width: horizontal ? 140 : ITEM_WIDTH, marginRight: horizontal ? 12 : 0 }}>
        <PodcastGridItem podcast={item} onPress={handlePress} />
      </View>
    );
  };

  return (
    <FlatList
      key={horizontal ? "h" : "v"}
      data={data}
      keyExtractor={(item) => item.id}
      horizontal={horizontal}
      numColumns={horizontal ? 1 : 2}
      showsHorizontalScrollIndicator={false}
      renderItem={renderItem}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No Podcasts found</Text>
        </View>
      }
      contentContainerStyle={[
        styles.container,
        horizontal && { paddingHorizontal: 12, paddingBottom: 10 },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingBottom: 80,
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
    marginBottom: 20,
  },
addCard: {
  flex: 1,
  margin: 8,
  backgroundColor: '#fff',
  borderRadius: 12,
  padding: 10,
  elevation: 2,
  justifyContent: "center",  // Centre verticalement
  alignItems: "center",      // Centre horizontalement
               // Ajoute une hauteur fixe pour un bon centrage
},

  addText: {
    marginTop: 8,
    color: "#007AFF",
    fontWeight: "bold",
    textAlign: "center",
  },
});
