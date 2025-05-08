import library from '@/assets/library.json'
import { unknownTrackImageUri } from '@/constants/images'
import { Artist, podcast, TrackWithpodcast } from '@/helpers/types'
import { Track } from 'react-native-track-player'
import { create } from 'zustand'

interface LibraryState {
	tracks: TrackWithpodcast[]
	toggleTrackFavorite: (track: Track) => void
	addTopodcast: (track: Track, podcastName: string) => void
}

export const useLibraryStore = create<LibraryState>()((set) => ({
	tracks: library,
	toggleTrackFavorite: (track) =>
		set((state) => ({
			tracks: state.tracks.map((currentTrack) => {
				if (currentTrack.url === track.url) {
					return {
						...currentTrack,
						rating: currentTrack.rating === 1 ? 0 : 1,
					}
				}

				return currentTrack
			}),
		})),
	addTopodcast: (track, podcastName) =>
		set((state) => ({
			tracks: state.tracks.map((currentTrack) => {
				if (currentTrack.url === track.url) {
					return {
						...currentTrack,
						podcast: [...(currentTrack.podcast ?? []), podcastName],
					}
				}

				return currentTrack
			}),
		})),
}))

export const useTracks = () => useLibraryStore((state) => state.tracks)

export const useFavorites = () => {
	const favorites = useLibraryStore((state) => state.tracks.filter((track) => track.rating === 1))
	const toggleTrackFavorite = useLibraryStore((state) => state.toggleTrackFavorite)

	return {
		favorites,
		toggleTrackFavorite,
	}
}

export const useArtists = () =>
	useLibraryStore((state) => {
		return state.tracks.reduce((acc, track) => {
			const existingArtist = acc.find((artist) => artist.name === track.artist)

			if (existingArtist) {
				existingArtist.tracks.push(track)
			} else {
				acc.push({
					name: track.artist ?? 'Unknown',
					tracks: [track],
				})
			}

			return acc
		}, [] as Artist[])
	})

export const usepodcasts = () => {
	const podcasts = useLibraryStore((state) => {
		return state.tracks.reduce((acc, track) => {
			track.podcast?.forEach((podcastName) => {
				const existingpodcast = acc.find((podcast) => podcast.name === podcastName)

				if (existingpodcast) {
					existingpodcast.tracks.push(track)
				} else {
					acc.push({
						name: podcastName,
						tracks: [track],
						artworkPreview: track.artwork ?? unknownTrackImageUri,
					})
				}
			})

			return acc
		}, [] as podcast[])
	})

	const addTopodcast = useLibraryStore((state) => state.addTopodcast)

	return { podcasts, addTopodcast }
}
