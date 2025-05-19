import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, ActivityIndicator } from "react-native";
import { useSearchBar } from "@/hooks/useSearchBar";
import { useEpisodes } from "@/hooks/useEpisods";
import { EpisodeList } from "@/components/EpisodeList";

const SearchScreen: React.FC = () => {
  const { search, SearchBarComponent } = useSearchBar();
  const [filteredTracks, setFilteredTracks] = useState<any[]>([]);
  const { episodes, loading, error } = useEpisodes();

  useEffect(() => {
    if (search.length === 0) {
      setFilteredTracks([]);
    } else {
      const filtered = episodes.filter(
        (track) =>
          track?.title && track.title.toLowerCase().includes(search.toLowerCase()) ||
          (track?.artist && track.artist.toLowerCase().includes(search.toLowerCase()))
      );
      setFilteredTracks(filtered);
    }
  }, [search, episodes]);
  
  return (
    <View style={{ flex: 1, paddingHorizontal: 10 }}>
      {SearchBarComponent}

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
      ) : error ? (
        <Text style={{ textAlign: "center", color: "red", marginTop: 20 }}>{error}</Text>
      ) : (
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          {filteredTracks.length > 0 ? (
            <EpisodeList data={filteredTracks} />
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
