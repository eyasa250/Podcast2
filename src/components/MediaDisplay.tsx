// components/MediaDisplay.tsx
import { View, Image, StyleSheet } from 'react-native';
import { unknownTrackImageUri } from '@/constants/images';
import { Video } from 'react-native-video';

interface Props {
  type: 'AUDIO' | 'VIDEO';
  artwork?: string;
  videoUrl?: string;
}

export const MediaDisplay = ({ type, artwork, videoUrl }: Props) => {
  if (type === 'VIDEO' && videoUrl) {
    return (
      <View style={styles.mediaContainer}>
        <Video
          source={{ uri: videoUrl }}
          style={styles.video}
          controls
          resizeMode="cover"
        />
      </View>
    );
  }

  return (
    <Image
      source={{ uri: artwork || unknownTrackImageUri }}
      style={styles.artwork}
    />
  );
};

const styles = StyleSheet.create({
  mediaContainer: {
    width: 300,
    height: 300,
    backgroundColor: '#000',
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 20,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  artwork: {
    width: 300,
    height: 300,
    borderRadius: 8,
    marginTop: 20,
  },
});
