import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FontAwesome6 } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Modalize } from 'react-native-modalize';
import { TrackOptionsModal } from '@/components/TrackOptionsModal';
import { defaultStyles } from '@/styles';
import { colors } from '@/core/theme';
import { AudioPlayer } from '@/components/AudioPlayer';
import { VideoPlayer } from '@/components/VideoPlayer';
import { useActiveTrack } from 'react-native-track-player';
import { TextTrackType } from 'react-native-video'; // 👈 requis pour les sous-titres

const isVideoUrl = (url: string) =>
  url?.endsWith('.mp4') || url?.includes('video') || url?.includes('.m3u8'); // simple heuristique

const PlayerScreen = () => {
  const { top, bottom } = useSafeAreaInsets();
  const modalRef = useRef<Modalize>(null);
  const activeTrack = useActiveTrack();

  const {
    trackType,
    videoUrl,
    transcriptionUrls,
  } = useLocalSearchParams<{
    trackType: 'AUDIO' | 'VIDEO';
    videoUrl?: string;
    transcriptionUrls?: string;
  }>();

  const subtitles = transcriptionUrls
    ? Object.entries(JSON.parse(transcriptionUrls)).map(([lang, uri]) => ({
        title: lang.toUpperCase(),
        language: lang,
        type: TextTrackType.VTT,
        uri,
      }))
    : [];

  const videoSourceUrl = videoUrl;
  const audioSourceUrl = activeTrack?.url;

  const showVideo = trackType === 'VIDEO' && videoSourceUrl;
  const showAudio = trackType === 'AUDIO' && activeTrack;

  if (trackType === 'AUDIO' && !activeTrack) {
    return (
      <View style={[defaultStyles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator color={colors.icon} />
      </View>
    );
  }

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
          <TouchableOpacity onPress={() => modalRef.current?.open()}>
            <FontAwesome6 name="ellipsis-vertical" size={25} color="white" />
          </TouchableOpacity>
        </View>

        {/* Player */}
        {showVideo ? (
          <VideoPlayer url={videoSourceUrl!} />
        ) : (
          <AudioPlayer />
        )}

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
      </View>
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
});

export default PlayerScreen;
