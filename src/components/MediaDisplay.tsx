import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import Video from 'react-native-video';
import { unknownTrackImageUri } from '@/constants/images';

type Props = {
  url: string;
  artwork?: string;
  isPlaying: boolean;
  onVideoEnd: () => void;
  trackType: string;
};
/* type Props = {
  url: string | number;
  artwork?: string;
  isPlaying: boolean;
  onVideoEnd: () => void;
  trackType: string;
  isLocal?: boolean; // ✅ flag optionnel pour dire si c’est un fichier local
}; */


export const MediaDisplay = ({  url, artwork, isPlaying, onVideoEnd, trackType }: Props) => {
  const isVideo = trackType === 'VIDEO';
  const videoPlayer = useRef(null);

  if (!url) return null;

  return isVideo ? (
    <Video
      ref={videoPlayer}
      source={{ uri: url }}
      style={styles.videoPlayer}
      controls={false} // ✅ contrôles natifs activés
      paused={!isPlaying}
      resizeMode="contain"
      onEnd={onVideoEnd}
    />
 /*    <Video
   // ref={videoPlayer}
    source={require('@/assets/sample.mp4')}    style={styles.videoPlayer}
    controls
    paused={!isPlaying}
    resizeMode="contain"
    onEnd={onVideoEnd}
  /> */
  

  ) : (
    <View style={styles.artworkImageContainer}>
      <FastImage
        source={{ uri: artwork ?? unknownTrackImageUri }}
        resizeMode="cover"
        style={styles.artworkImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  videoPlayer: {
    width: '100%',
    height: 220,
    backgroundColor: 'black',
    borderRadius: 20, // ✅ plus arrondi
    overflow: 'hidden', // ✅ permet de masquer les coins dépassants
    marginBottom: 16,
  },
  artworkImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
    borderRadius: 20,
    overflow: 'hidden', // ✅ arrondis aussi
    backgroundColor: '#000',
    marginBottom: 16,
  },
  artworkImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
});
