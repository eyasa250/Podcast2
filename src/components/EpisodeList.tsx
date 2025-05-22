import { FlatList, View, StyleSheet, Text } from 'react-native';
import { EpisodeCard } from './EpisodeCard'; // Assurez-vous que ce composant gère correctement le style
import TrackPlayer, { Track } from 'react-native-track-player';
import { defaultStyles, utilsStyles } from '@/styles';
import FastImage from 'react-native-fast-image';
import { unknownTrackImageUri } from '@/constants/images';
import { colors } from '@/core/theme';
import { router } from 'expo-router';
import { Episode } from '@/types';

export const EpisodeList = ({ data }: { data: Episode[] }) => {

  /* const handleTrackSelect = async (track: Track) => {
    console.log("🎯 Track envoyé au player:", JSON.stringify(track, null, 2));

    await TrackPlayer.load(track); // Charge le track dans le player
    await TrackPlayer.play(); // Joue le tracka
    router.push('/player'); // Redirige vers PlayerScreen
  }; */
  const handleTrackSelect = async (episode: Episode) => {
  router.push({
    pathname: '/player',
    params: {
      videoUrl: episode.videoUrl,
      title: episode.title,
      artist: episode.podcast.title,
      artwork: episode.coverImageUrl,
    },
  });
};

const episodeToTrack = (episode: Episode): Track => ({
  id: episode.id,
  title: episode.title,
  url: episode.trackType === "VIDEO" ? episode.videoUrl! : episode.audioUrl!,
  artist: episode.podcast.title, // facultatif
  artwork: episode.coverImageUrl,        // facultatif
});

  return (
    <FlatList
      data={data}
      ListEmptyComponent={
        <View>
          <Text style={utilsStyles.emptyContentText}>No Podcasts found</Text>
          <FastImage
            source={{ uri: unknownTrackImageUri }}
            style={styles.trackArtworkImage}
          />
        </View>
      }
 renderItem={({ item: episode }) => {
      console.log("🎯 episode envoyé au player:", JSON.stringify(episode, null, 2));

  const track = episodeToTrack(episode);
  return (
    <View style={styles.gridItem}>
      <EpisodeCard episode={episode} onPress={() => handleTrackSelect(episode)} />
    </View>
  );
}}

      keyExtractor={(item, index) => `${item.trackType === "VIDEO" ? item.videoUrl! : item.audioUrl!}-${index}`}
      contentContainerStyle={styles.contentContainer} // Optional, to add margin/padding to the list
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 80,
    paddingHorizontal: 16,
  },
  gridItem: {
    marginBottom: 8,
  },
  emptyContentText: {
    ...defaultStyles.text,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 20,
  },
  trackArtworkImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
});
