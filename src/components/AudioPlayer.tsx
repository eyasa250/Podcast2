import { View, Image, Text, StyleSheet } from 'react-native';
import { useActiveTrack, useProgress } from 'react-native-track-player';
import { PlayerControls } from './PlayerControls';
import Constants from 'expo-constants';
import { PlayerProgressBar } from './PlayerProgressbar';

const BASE_URL = Constants.expoConfig?.extra?.apiUrl;

export const AudioPlayer = () => {
  const activeTrack = useActiveTrack();
const { position } = useProgress(250); // mise à jour toutes les 250 ms

  if (!activeTrack) return null;

  const artworkUri = activeTrack.artwork?.startsWith('http')
    ? activeTrack.artwork
    : `${BASE_URL}${activeTrack.artwork}`;

  return (
    <View style={styles.container}>
      <Image source={{ uri: artworkUri }} style={styles.coverImage} />
      <Text numberOfLines={1} style={styles.title}>{activeTrack.title}</Text>
      {activeTrack.artist && <Text style={styles.artist}>{activeTrack.artist}</Text>}
      
      <View style={styles.progressContainer}>
        <PlayerProgressBar />
      </View>

      <View style={styles.controlsContainer}>
        <PlayerControls />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 24,
  },
  coverImage: {
    width: 240,
    height: 240,
    borderRadius: 12,
    marginBottom: 20,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  artist: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  progressContainer: {
    width: '100%',
    marginBottom: 20,
  },
  controlsContainer: {
    width: '100%',
  },
});
