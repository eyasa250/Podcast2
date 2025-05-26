import { View, Image, StyleSheet, Text } from 'react-native';
import { useActiveTrack } from 'react-native-track-player';
import { unknownTrackImageUri } from '@/constants/images';
import { MovingText } from './MovingText';
import { PlayerProgressBar } from './PlayerProgressbar';
import { PlayerControls } from './PlayerControls';

export const AudioPlayer = () => {
  const activeTrack = useActiveTrack();

  if (!activeTrack) return null;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: activeTrack.artwork || unknownTrackImageUri }}
        style={styles.artwork}
      />
      <MovingText text={activeTrack.title} />
      {activeTrack.artist && <Text style={styles.artist}>{activeTrack.artist}</Text>}
      <PlayerProgressBar />
      <PlayerControls />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  artwork: {
    width: 250,
    height: 250,
    borderRadius: 12,
    marginBottom: 20,
  },
  artist: {
    fontSize: 16,
    color: 'lightgray',
    marginTop: 4,
  },
});
