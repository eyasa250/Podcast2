import { Track } from 'react-native-track-player'

export type podcast = {
	name: string
	tracks: Track[]
	artworkPreview: string
}

export type Artist = {
	name: string
	tracks: Track[]
}

export type TrackWithpodcast = Track & { podcast?: string[] }
