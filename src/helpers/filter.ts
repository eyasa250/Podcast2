import { Artist, podcast } from './types'


const episodTitleFilter = (title: string) => (track: any) =>
	track.title?.toLowerCase().includes(title.toLowerCase())


const artistNameFilter = (name: string) => (artist: Artist) =>
	artist.name.toLowerCase().includes(name.toLowerCase())


const podcastNameFilter = (name: string) => (podcast: podcast) =>
	podcast.name.toLowerCase().includes(name.toLowerCase())
export { episodTitleFilter, artistNameFilter, podcastNameFilter };
