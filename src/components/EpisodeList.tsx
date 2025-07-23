import { FlatList, View, StyleSheet,Text  } from 'react-native';
import { EpisodeCard } from './EpisodeCard';
import { Episode } from '@/types';
import { router } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { selectEpisode } from '@/store/slices/episodeSlice';
import React from 'react';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
export const EpisodeList = ({ data }: { data: Episode[] }) => {
  
 const dispatch = useDispatch();
  const episodes = useSelector((state: RootState) => state.episodes.byPodcast);

  const handleTrackSelect = (episode: Episode) => {
    dispatch(selectEpisode(episode));
      router.push({
        pathname: '/player',
      
      });
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <EpisodeCard
            episode={item}
            onPress={() => handleTrackSelect(item)}
          />
        </View>
      )}
      ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <MaterialIcons name="library-music" size={50} color="#555" />
                <Text style={styles.emptyText}>No episodes found</Text>
              </View>
            }
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 80,
    paddingHorizontal: 16,
  },
  itemContainer: {
    marginBottom: 8,
  },  emptyContainer: {
    alignItems: "center",
    marginTop: 50,
  },  emptyText: {
    fontSize: 16,
    color: "#888",
    marginBottom: 20,
  },
});
