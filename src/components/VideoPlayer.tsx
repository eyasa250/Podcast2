// VideoPlayer.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import Video from "react-native-video";

type VideoPlayerProps = {
  source: string;
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({ source }) => {
  return (
    <View style={styles.container}>
      <Video
        source={{ uri: source }}
        style={styles.video}
        controls
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: "100%",
    height: 300,
  },
});

export default VideoPlayer;