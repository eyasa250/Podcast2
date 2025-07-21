import { useEffect, useRef, useState } from 'react';
import TrackPlayer, { Capability, RatingType, RepeatMode } from 'react-native-track-player';

let playerInitialized = false;

export const useSetupTrackPlayer = () => {
  const initialized = useRef(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const setup = async () => {
      if (playerInitialized || initialized.current) {
        setIsReady(true);
        return;
      }

      try {
        await TrackPlayer.setupPlayer({ maxCacheSize: 1024 * 10 });
        await TrackPlayer.updateOptions({
          ratingType: RatingType.Heart,
          capabilities: [
            Capability.Play,
            Capability.Pause,
            Capability.SkipToNext,
            Capability.SkipToPrevious,
            Capability.Stop,
          ],
        });
        await TrackPlayer.setVolume(0.3);
        await TrackPlayer.setRepeatMode(RepeatMode.Queue);

        initialized.current = true;
        playerInitialized = true;
        setIsReady(true);
      } catch (error) {
        console.error('TrackPlayer setup error:', error);
      }
    };

    setup();
  }, []);

  return isReady;
};
