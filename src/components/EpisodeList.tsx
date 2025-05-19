import { FlatList, View, StyleSheet, Text } from 'react-native';
import { EpisodeCard } from './EpisodeCard'; // Assurez-vous que ce composant gère correctement le style
import TrackPlayer, { Track } from 'react-native-track-player';
import { defaultStyles, utilsStyles } from '@/styles';
import FastImage from 'react-native-fast-image';
import { unknownTrackImageUri } from '@/constants/images';
import { colors } from '@/core/theme';
import { router } from 'expo-router';

export const EpisodeList = ({ data }: { data: Track[] }) => {

  const handleTrackSelect = async (track: Track) => {
    await TrackPlayer.load(track); // Charge le track dans le player
    await TrackPlayer.play(); // Joue le track
    router.push('/player'); // Redirige vers PlayerScreen
  };

  return (
    <FlatList
      data={data}
      horizontal // Affiche les éléments horizontalement
      ListEmptyComponent={
        <View>
          <Text style={utilsStyles.emptyContentText}>No Podcasts found</Text>
          <FastImage
            source={{ uri: unknownTrackImageUri }}
            style={styles.trackArtworkImage}
          />
        </View>
      }
      renderItem={({ item: track }) => (
        <View style={styles.gridItem}>
          <EpisodeCard episode={track} onPress={() => handleTrackSelect(track)} />
        </View>
      )}
      keyExtractor={(item, index) => `${item.url}-${index}`}
      contentContainerStyle={styles.contentContainer} // Optional, to add margin/padding to the list
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 80 ,
    paddingHorizontal: 10, // Ajustez la marge horizontale si nécessaire
  },
  gridItem: {
    marginHorizontal: 10, // Ajoutez de la marge entre les éléments
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
