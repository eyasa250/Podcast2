import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FontAwesome6 } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Modalize } from 'react-native-modalize';
import { TrackOptionsModal } from '@/components/TrackOptionsModal';
import { defaultStyles } from '@/styles';
import { colors } from '@/core/theme';
import { AudioPlayer } from '@/components/AudioPlayer';
import { VideoPlayer } from '@/components/VideoPlayer';
import { useActiveTrack } from 'react-native-track-player';
import { ISO639_1, TextTrackType } from 'react-native-video'; // 👈 requis pour les sous-titres
import { EpisodeList } from '@/components/EpisodeList';
import { useEpisodes } from '@/hooks/useEpisods';
import { useView } from '@/hooks/useView';

interface SubtitleTrack {
  title: string;
  language: ISO639_1;
  type: TextTrackType;
  uri: string;
}
const isVideoUrl = (url: string) =>
  url?.endsWith('.mp4') || url?.includes('video') || url?.includes('.m3u8'); // simple heuristique

const PlayerScreen = () => {
  const { top, bottom } = useSafeAreaInsets();
  const modalRef = useRef<Modalize>(null);
  const activeTrack = useActiveTrack();
const { TotalEpisodesViews, newView } = useView();
const [episodeViews, setEpisodeViews] = useState<number>(0);
console.log("welcome")
const {
  id,
  videoUrl,
  transcriptionUrls,
  description,
  podcast,
  podcastId,
  title,
  likes,
  views,
} = useLocalSearchParams<{
  id?:string;
  videoUrl?: string;
  transcriptionUrls?: string;
  podcast?: string;
  description?:string;
  podcastId?: string;
  title?: string;
  likes?: string;
  views?: string;
}>();

const parsedEpisodeId = parseInt(id || '0', 10);

const parsedLikes = parseInt(likes || '0', 10);
const parsedViews = parseInt(views || '0', 10);
const { episodes } = useEpisodes(podcastId ? { podcastId, favorites: false } : { favorites: false });

const subtitles: SubtitleTrack[] = transcriptionUrls
  ? Object.entries(JSON.parse(transcriptionUrls)).map(([lang, uri]) => {
      console.log(`📥 Subtitle parsed: [${lang}] => ${uri}`);
      return {
        title: lang.toUpperCase(),
        language: lang as ISO639_1,
        type: TextTrackType.VTT,
        uri: uri as string,
      };
    })
  : [];

console.log('🎬 Subtitle list final:', subtitles);


const hasFetchedViews = useRef(false);

useEffect(() => {
  if (!parsedEpisodeId || hasFetchedViews.current) return;
  //if (!parsedEpisodeId) return;

  const fetchViews = async () => {
    //console.log("welcome");
    await newView(parsedEpisodeId); // ➕
    const total = await TotalEpisodesViews(parsedEpisodeId);
    if (typeof total === 'number') {
      setEpisodeViews(total);
    } else if (total?.total) {
      setEpisodeViews(total.total);
    }
    hasFetchedViews.current = true;
  };

  fetchViews();
}, [parsedEpisodeId]);

console.log('views number',episodeViews )

const BASE_URL = 'http://192.168.1.17:3001'; // ou depuis .env

const videoSourceUrl = videoUrl?.startsWith('http') 
  ? videoUrl 
  : `${BASE_URL}${videoUrl}`;

  const audioSourceUrl = activeTrack?.url;


const openModal = () => {
  requestAnimationFrame(() => {
    modalRef.current?.open();
  });
};
  return (
    <LinearGradient style={{ flex: 1 }} colors={['#000', '#000']}>
    
      <View style={{ paddingTop: top + 40, paddingBottom: bottom + 20 }}>
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.back()}>
            <FontAwesome6 name="arrow-left" size={25} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle} numberOfLines={1}>
            Lecture en cours
          </Text>
            <TouchableOpacity onPress={openModal}>
            <FontAwesome6 name="ellipsis-vertical" size={25} color="white" />
          </TouchableOpacity>
        </View>
      </View>

        {/* Player */}
        {/* {showVideo ? ( */}
{videoSourceUrl ? (
  <VideoPlayer url={videoSourceUrl} textTracks={subtitles} />
) : (
  <Text style={{ color: 'white', textAlign: 'center' }}>Aucune vidéo disponible</Text>
)}
      {/*   ) : (
          <AudioPlayer />
        )} */}
{/* 🔻 TITRE + DESCRIPTION */}
    <View style={{ flex: 1 }}>
  <ScrollView>
    <View style={styles.detailsContainer}>
      <Text style={styles.episodeTitle}>{title}</Text>
      <Text style={styles.episodeViews}>{episodeViews} views</Text>
      <Text style={styles.episodeDescription}>{description}</Text>
    </View>
  </ScrollView>

  <Text style={styles.sectionTitle}>More Episodes</Text>
  <EpisodeList data={episodes} />
</View>


        {/* Options */}
        {activeTrack && (
          <TrackOptionsModal
            ref={modalRef}
            trackTitle={activeTrack.title}
            artist={activeTrack.artist}
            onLike={() => console.log('💖 Liked track')}
            onAddTopodcast={() => console.log('➕ Added to podcast')}
          />
        )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginHorizontal: 16,
  },
  episodeViews: {
  color: '#aaa',
  fontSize: 12,
  marginBottom: 4,
},

  videoInfoContainer: {
  paddingHorizontal: 16,
  paddingVertical: 12,
  backgroundColor: '#111',
  borderTopWidth: 1,
  borderColor: '#222',
},
videoTitle: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#fff',
  marginBottom: 4,
},
videoAuthor: {
  fontSize: 14,
  color: '#aaa',
  marginBottom: 8,
},
statsRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
},
stat: {
  fontSize: 14,
  color: '#ccc',
},
detailsContainer: {
  paddingHorizontal: 16,
  paddingTop: 12,
  paddingBottom: 8,
},
episodeTitle: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
  marginBottom: 4,
},
episodeDescription: {
  color: '#ccc',
  fontSize: 14,
  lineHeight: 20,
},
sectionTitle: {
  fontSize: 16,
  fontWeight: '600',
  color: '#fff',
  paddingHorizontal: 16,
  marginTop: 16,
  marginBottom: 8,
},

});

export default PlayerScreen;
