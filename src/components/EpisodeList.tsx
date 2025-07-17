import { FlatList, View, StyleSheet } from 'react-native';
import { EpisodeCard } from './EpisodeCard';
import { Episode } from '@/types';
import { router } from 'expo-router';

export const EpisodeList = ({ data }: { data: Episode[] }) => {
  const handleTrackSelect = (episode: Episode) => {
    router.push({
      pathname: '/player',
      params: {
        id: episode.id,
        title: episode.title,
        description: episode.description,
        podcast: episode.podcast.title,
        podcastId: episode.podcastId,
        artwork: episode.coverImageUrl,
        videoUrl: episode.videoUrl!,
        transcriptionUrls: JSON.stringify(episode.transcriptionUrls),
      },
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
  },
});
