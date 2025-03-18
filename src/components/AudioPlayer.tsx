import { useState } from "react";
import { Audio } from "expo-av";
import { View, TouchableOpacity, Text } from "react-native";

export default function AudioPlayer({ source }: { source: string }) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  async function handlePlayPause() {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
      } else {
        await sound.playAsync();
        setIsPlaying(true);
      }
    } else {
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: source },
        { shouldPlay: true }
      );
      setSound(newSound);
      setIsPlaying(true);
    }
  }

  return (
    <View>
      <TouchableOpacity onPress={handlePlayPause}>
        <Text>{isPlaying ? "Pause" : "Play"}</Text>
      </TouchableOpacity>
    </View>
  );
}
