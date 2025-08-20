import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, ActivityIndicator } from "react-native";
import { RootState, AppDispatch } from "@/store"; // 👈 assure-toi que AppDispatch est exporté
import { useSearchBar } from "@/hooks/useSearchBar";
import { EpisodeList } from "@/components/EpisodeList";
import { fetchAllEpisodes } from "@/store/slices/episodeSlice";
import { useDispatch, useSelector } from "react-redux";

const SearchScreen: React.FC = () => {
const dispatch: AppDispatch = useDispatch();
  const { search, SearchBarComponent } = useSearchBar();
  const [filteredEpisodes, setFilteredEpisodes] = useState<any[]>([]);

  const { allEpisodes, loading, error } = useSelector(
    (state: RootState) => state.episodes
  );

  // 🔹 Charger tous les épisodes au montage
  useEffect(() => {
    dispatch(fetchAllEpisodes());
  }, [dispatch]);

  // 🔹 Filtrer les épisodes par titre
 useEffect(() => {
  if (search.length === 0) {
    setFilteredEpisodes(allEpisodes); // 🔹 afficher tout si search vide
  } else {
    const filtered = allEpisodes.filter(
      (ep) => ep?.title?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredEpisodes(filtered);
  }
}, [search, allEpisodes]);


  return (
    <View style={{ flex: 1, paddingHorizontal: 10 }}>
      {SearchBarComponent}

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
      ) : error ? (
        <Text style={{ textAlign: "center", color: "red", marginTop: 20 }}>{error}</Text>
      ) : (
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          {filteredEpisodes.length > 0 ? (
            <EpisodeList data={filteredEpisodes} />
          ) : (
            <View style={{ alignItems: "center", marginTop: 40 }}>
              <Text style={{ fontSize: 18, color: "gray" }}>No Podcasts found</Text>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default SearchScreen;
