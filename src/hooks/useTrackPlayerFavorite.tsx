import { useFavorites } from '@/store/library'
import { useCallback, useMemo } from 'react'
import TrackPlayer, { useActiveTrack } from 'react-native-track-player'

export const useTrackPlayerFavorite = () => {
  const activeTrack = useActiveTrack()
  const { favorites, toggleTrackFavorite } = useFavorites()

  const isFavorite = useMemo(() => {
	return favorites.find((track) => track.url === activeTrack?.url)?.rating === 1
  }, [favorites, activeTrack?.url])
  

  const toggleFavorite = useCallback(async () => {
    const id = await TrackPlayer.getActiveTrackIndex()
    if (id == null) return

    await TrackPlayer.updateMetadataForTrack(id, {
      rating: isFavorite ? 0 : 1,
    })

    if (activeTrack) {
      toggleTrackFavorite(activeTrack)
    }
  }, [isFavorite, toggleTrackFavorite, activeTrack])

  return { isFavorite, toggleFavorite }
}
