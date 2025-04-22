import { usePlaybackState, State, useActiveTrack } from 'react-native-track-player'

export const usePlayerStatus = () => {
  const playback = usePlaybackState()

  const isPlaying = (typeof playback === 'object'
    ? playback.state === State.Playing
    : playback === State.Playing)

  const activeTrack = useActiveTrack()

  return { isPlaying, activeTrack }
}
