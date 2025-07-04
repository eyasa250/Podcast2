import React, { useState, useCallback } from "react";
import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import { EpisodeList } from "@/components/EpisodeList";
import { useAuth } from "@/hooks/useAuth";
import { useFocusEffect } from "@react-navigation/native";
import { useFavorites } from "@/hooks/useFavorite";
import { colors } from "@/core/theme";
import { TagList } from "@/components/TagList";

const FavoritesScreen = () => {
  const { user } = useAuth();
  const { getUserFavorites, loading, error } = useFavorites();
  const [episodes, setEpisodes] = useState([]);

  const loadFavorites = async () => {
    if (!user?.id) return;
    const data = await getUserFavorites(user.id);
    setEpisodes(data || []);
  };
const staticTags = ['Inspiration', 'Technologie', 'Humour', 'Musique', 'Développement'];

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [user])
  );

  // Extraire tous les tags des épisodes

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      
      <View style={{ padding: 20 }}>
 <View style={{ paddingHorizontal: 20, marginBottom: 10 }}>
  <TagList tags={staticTags} onTagPress={(tag) => console.log(`Tag pressé : ${tag}`)} />
</View>



        {/* Liste des épisodes */}
        <EpisodeList data={episodes} />
      </View>
    </ScrollView>
  );
};

export default FavoritesScreen;
