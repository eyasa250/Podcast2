import { useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Slider } from 'react-native-awesome-slider';
import { useSharedValue } from 'react-native-reanimated';
import { View, ViewProps } from 'react-native';
import { colors } from '@/core/theme';
import { useTrackPlayerVolume } from '@/hooks/useTrackPlayerVolume';
import { utilsStyles } from '@/styles';

export const PlayerVolumeBar = ({ style }: ViewProps) => {
  const { volume, updateVolume } = useTrackPlayerVolume();
  const progress = useSharedValue(volume ?? 0);

  useEffect(() => {
    // Met à jour la valeur de progress à l'intérieur de useEffect pour éviter les écritures directes dans le rendu
    progress.value = volume ?? 0;
  }, [volume]);

  const min = useSharedValue(0);
  const max = useSharedValue(1);

  return (
    <View style={style}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons name="volume-low" size={20} color={colors.icon} style={{ opacity: 0.8 }} />

        <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 10 }}>
          <Slider
            progress={progress}
            minimumValue={min}
            containerStyle={utilsStyles.slider}
            onValueChange={(value) => {
              updateVolume(value);
            }}
            renderBubble={() => null}
            theme={{
              maximumTrackTintColor: colors.maximumTrackTintColor,
              minimumTrackTintColor: colors.minimumTrackTintColor,
            }}
            thumbWidth={0}
            maximumValue={max}
          />
        </View>

        <Ionicons name="volume-high" size={20} color={colors.icon} style={{ opacity: 0.8 }} />
      </View>
    </View>
  );
};
