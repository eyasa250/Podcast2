import React, { useState, useEffect } from "react";
import { View, ScrollView, Text } from "react-native";
import { useSearchBar } from "@/hooks/useSearchBar";
import library from "@/assets/library.json";
import { TracksList } from "@/components/TracksList";

const SearchScreen: React.FC = () => {
  const { search, SearchBarComponent } = useSearchBar();
  const [filteredTracks, setFilteredTracks] = useState<any[]>([]);  // Initialise avec une liste vide de type any

  // Met à jour les morceaux filtrés en fonction de la recherche
  useEffect(() => {
    if (search.length === 0) {
      setFilteredTracks([]);  // Si la recherche est vide, ne montre rien
    } else {
      const filtered = library.filter(
        (track) =>
          track.title.toLowerCase().includes(search.toLowerCase()) ||
          (track.artist && track.artist.toLowerCase().includes(search.toLowerCase()))
      );
      setFilteredTracks(filtered);  // Met à jour les morceaux filtrés
    }
  }, [search]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ paddingHorizontal: 10 }}
      >
        {SearchBarComponent}
        {/* Utiliser TracksList avec les morceaux filtrés */}
        {filteredTracks.length > 0 ? (
          <TracksList data={filteredTracks} /> 
           /* Passer filteredTracks */
        ) : (
          <View style={{ alignItems: 'center', marginTop: 40 }}>
            <Text style={{ fontSize: 18, color: 'gray' }}>No Podcasts found</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default SearchScreen;
