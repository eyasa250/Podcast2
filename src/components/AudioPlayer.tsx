import { useState, useEffect } from "react";
import { Audio } from "expo-av";
import { View, TouchableOpacity, Text } from "react-native";

export default function AudioPlayer({ source }: { source: string }) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync(); // Nettoyage du son lorsqu'on quitte le composant
        }
      : undefined;
  }, [sound]);

  async function handlePlayPause() {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
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
