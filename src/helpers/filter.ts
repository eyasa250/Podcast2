import { Artist, Playlist } from './types'


const episodTitleFilter = (title: string) => (track: any) =>
	track.title?.toLowerCase().includes(title.toLowerCase())


const artistNameFilter = (name: string) => (artist: Artist) =>
	artist.name.toLowerCase().includes(name.toLowerCase())


const playlistNameFilter = (name: string) => (playlist: Playlist) =>
	playlist.name.toLowerCase().includes(name.toLowerCase())
export { episodTitleFilter, artistNameFilter, playlistNameFilter };
