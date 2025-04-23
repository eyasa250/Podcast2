import React, { useRef, useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { useActiveTrack } from 'react-native-track-player';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/core/theme';
import { defaultStyles } from '@/styles';
import { unknownTrackImageUri } from '@/constants/images';
import { usePlayerBackground } from '@/hooks/usePlayerBackground';
import { MovingText } from '@/components/MovingText';
import { PlayerProgressBar } from '@/components/PlayerProgressbar';
import { PlayerControls } from '@/components/PlayerControls';
import { FontAwesome6 } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Modalize } from 'react-native-modalize';
import { TrackOptionsModal } from '@/components/TrackOptionsModal';
import Video from 'react-native-video';
import subtitles from '@/assets/sample.json'; // ton fichier JSON de sous-titres

const PlayerScreen = () => {
  const activeTrack = useActiveTrack();
  const { imageColors } = usePlayerBackground(activeTrack?.artwork ?? unknownTrackImageUri);
  const { top, bottom } = useSafeAreaInsets();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  type Subtitle = { startTime: number; endTime: number; text: string };
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [activeSubtitle, setActiveSubtitle] = useState<Subtitle | null>(null);
  
    const modalRef = useRef<Modalize>(null);

  useEffect(() => {
    const active = subtitles.find(
      (line) => currentTime >= line.startTime && currentTime <= line.endTime
    );
  
    setActiveSubtitle(active ?? null); // ✅ transforme undefined en null
  }, [currentTime]);
  

  if (!activeTrack) {
    return (
      <View style={[defaultStyles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator color={colors.icon} />
      </View>
    );
  }

  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={
        imageColors
          ? [imageColors.background, imageColors.primary]
          : [colors.background, colors.background]
      }
    >
      <View style={[styles.overlayContainer, { paddingTop: top + 40, paddingBottom: bottom + 20 }]}>
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

        {/* Video Player */}
        <View style={{ position: 'relative' }}>
          <Video
            source={{ uri: activeTrack.url }}
            style={styles.video}
            controls={true}
            resizeMode="contain"
            onLoad={() => setIsPlaying(true)}
            onEnd={() => setIsPlaying(false)}
            onProgress={({ currentTime }) => setCurrentTime(currentTime)}
            onFullscreenPlayerWillPresent={() => setIsFullscreen(true)}
            onFullscreenPlayerWillDismiss={() => setIsFullscreen(false)}
          />
          {activeSubtitle && (
  <View
    style={[
      styles.subtitleContainer,
      isFullscreen && styles.subtitleFullscreen,
    ]}
  >
    <Text style={styles.subtitleText}>{activeSubtitle.text}</Text>
  </View>
)}

        </View>

        {/* Track Infos */}
        <View style={styles.bottomSection}>
          <View style={styles.trackInfoContainer}>
            <MovingText
              text={activeTrack.title ?? ''}
              animationThreshold={30}
              style={styles.trackTitleText}
            />
            {activeTrack.artist && (
              <Text numberOfLines={1} style={styles.trackArtistText}>
                {activeTrack.artist}
              </Text>
            )}
          </View>
          <PlayerProgressBar style={{ marginVertical: 12 }} />
          <PlayerControls />
        </View>
      </View>

      <TrackOptionsModal
        ref={modalRef}
        trackTitle={activeTrack.title}
        artist={activeTrack.artist}
        onLike={() => console.log('💖 Liked track')}
        onAddToPlaylist={() => console.log('➕ Added to playlist')}
      />
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
  overlayContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },subtitleFullscreen: {
    bottom: 60, // Plus haut que 10 pour qu'ils apparaissent au-dessus des contrôles natifs
    zIndex: 1000,
  },
  
  video: {
    width: '100%',
    height: 250,
    backgroundColor: 'black',
  },
  subtitleContainer: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  subtitleText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  bottomSection: {
    flexShrink: 1,
    justifyContent: 'flex-start',
  },
  trackInfoContainer: {
    alignItems: 'baseline',
    marginBottom: 12,
  },
  trackTitleText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  trackArtistText: {
    fontSize: 16,
    color: 'lightgray',
    textAlign: 'center',
    marginTop: 4,
  },
});

export default PlayerScreen;
