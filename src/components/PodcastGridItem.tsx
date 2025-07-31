import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Podcast } from '@/types';
import { unknownTrackImageUri } from '@/constants/images';
import Constants from 'expo-constants';

type Props = {
  podcast: Podcast;
  onPress: (podcast: Podcast) => void;
};
const BASE_URL = Constants.expoConfig?.extra?.apiUrl


export const PodcastGridItem = ({ podcast, onPress }: Props) => {
  const artworkUri = podcast.coverImageUrl?.startsWith("http")
    ? podcast.coverImageUrl
    : `${BASE_URL}${podcast.coverImageUrl}`;;

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(podcast)}>
      <Image
        source={{ uri: artworkUri }}
        style={styles.image}
      />
      <Text style={styles.title} numberOfLines={2}>{podcast.title}</Text>
      {podcast.category && (
        <Text style={styles.category} numberOfLines={1}>
          {podcast.category}
        </Text>
      )}
      <Text style={styles.author} numberOfLines={1}>{podcast.author || 'Unknown Author'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    elevation: 2,
  },
  image: {
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  category: {
    fontSize: 12,
    color: '#555',
    marginTop: 2,
  },
  author: {
    color: '#888',
    fontSize: 12,
    marginTop: 2,
  },
});
