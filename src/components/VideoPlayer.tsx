import { View, StyleSheet } from 'react-native';
import { Video, TextTrackType, SelectedTrackType } from 'react-native-video';

interface Props {
  url: string;
  subtitleUrl?: string;
}

export const VideoPlayer = ({ url, subtitleUrl }: Props) => {
  return (
    <View style={styles.videoContainer}>
      <Video
        source={{ uri: url }}
        style={styles.video}
        controls
        resizeMode="contain"
        textTracks={
          subtitleUrl
            ? [
                {
                  title: 'Français',
                  language: 'fr',
                  type: TextTrackType.VTT,
                  uri: subtitleUrl,
                },
              ]
            : []
        }
        selectedTextTrack={{
          type: SelectedTrackType.LANGUAGE,
          value: 'fr',
        }}
        onError={(e) => console.error('Video error:', e)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    width: '100%',
    height: 250,
    backgroundColor: 'black',
  },
  video: {
    width: '100%',
    height: '100%',
  },
});
