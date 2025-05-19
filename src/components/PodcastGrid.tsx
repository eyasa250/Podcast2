import React from 'react';
import { FlatList, View, StyleSheet, Text, Dimensions } from 'react-native';
import { Podcast } from '@/types';
import { unknownTrackImageUri } from '@/constants/images';
import FastImage from 'react-native-fast-image';
import { useRouter } from 'expo-router';
import { PodcastGridItem } from './PodcastGridItem';

type Props = {
  data: Podcast[];
};

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 48) / 2; // 20 padding + 2*margin(8)

export const PodcastGrid = ({ data }: Props) => {
  const router = useRouter();

  const handlePress = (podcast: Podcast) => {
    router.push({
      pathname: '/(tabs)/podcasts/podcastDetails',
      params: { id: podcast.id },
    });
  };

  return (
    <FlatList
      data={data}
      numColumns={2}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={{ width: ITEM_WIDTH }}>
          <PodcastGridItem podcast={item} onPress={handlePress} />
        </View>
      )}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No Podcasts found</Text>
          <FastImage source={{ uri: unknownTrackImageUri }} style={styles.emptyImage} />
        </View>
      }
      contentContainerStyle={styles.container}
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
