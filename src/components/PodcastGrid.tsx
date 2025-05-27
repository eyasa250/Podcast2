import React from 'react';
import { FlatList, View, StyleSheet, Text, Dimensions } from 'react-native';
import { Podcast } from '@/types';
import { unknownTrackImageUri } from '@/constants/images';
import FastImage from 'react-native-fast-image';
import { useRouter } from 'expo-router';
import { PodcastGridItem } from './PodcastGridItem';

type Props = {
  data: Podcast[];
  horizontal?: boolean;

};

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 48) / 2; // 20 padding + 2*margin(8)

export const PodcastGrid = ({ data, horizontal = false }: Props) => {
  const router = useRouter();

  const handlePress = (podcast: Podcast) => {
    router.push({
      pathname: '/(tabs)/podcasts/podcastDetails',
  params: {
    id: podcast.id,
    title: podcast.title,
    author: podcast.author,
    // etc.
  },    });
  };

  return (
    <FlatList
      key={horizontal ? 'h' : 'v'} // 👈 clé unique selon le mode
      data={data}
      keyExtractor={(item) => item.id}
      horizontal={horizontal}
      numColumns={horizontal ? 1 : 2}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <View style={{ width: horizontal ? 140 : ITEM_WIDTH, marginRight: horizontal ? 12 : 0 }}>
          <PodcastGridItem podcast={item} onPress={handlePress} />
        </View>
      )}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No Podcasts found</Text>
          <FastImage source={{ uri: unknownTrackImageUri }} style={styles.emptyImage} />
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
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
  },
  emptyImage: {
    width: 120,
    height: 120,
    opacity: 0.3,
  },
});
