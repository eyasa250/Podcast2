import React, { useRef, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { useActiveTrack } from 'react-native-track-player';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/core/theme';
import { defaultStyles } from '@/styles';
import { unknownTrackImageUri } from '@/constants/images';
import { usePlayerBackground } from '@/hooks/usePlayerBackground';
import { MediaDisplay } from '@/components/MediaDisplay';
import { MovingText } from '@/components/MovingText';
import { PlayerProgressBar } from '@/components/PlayerProgressbar';
import { PlayerControls } from '@/components/PlayerControls';
import { FontAwesome6 } from '@expo/vector-icons' // (si installé)
import { router } from 'expo-router';
import { Modalize } from 'react-native-modalize';
import { TrackOptionsModal } from '@/components/TrackOptionsModal';
import Video from 'react-native-video';
import { useProgress } from 'react-native-track-player';

const PlayerScreen = () => {
  const activeTrack = useActiveTrack();
  const { imageColors } = usePlayerBackground(activeTrack?.artwork ?? unknownTrackImageUri);
  const { top, bottom } = useSafeAreaInsets();
  const [isPlaying, setIsPlaying] = useState(false);


  console.log('🎵 Active Track URL:', activeTrack?.url);
  const modalRef = useRef<Modalize>(null);
  const videoUrl = 'http://192.168.1.16:3001/uploads/sample.mp4';

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
        <FontAwesome6 name="arrow-left" size={25} color='white' />
      </TouchableOpacity>

      <Text style={styles.headerTitle} numberOfLines={1}>
        Lecture en cours
      </Text>

              <TouchableOpacity  onPress={(event) => { event.persist();
          console.log('📦 Bouton options pressé');
          if (modalRef.current) {
            console.log('📈 modalRef trouvé, ouverture...');
            modalRef.current.open();
          } else {
            console.log('❌ modalRef est null');
          }
        }}>
      <FontAwesome6 name="ellipsis-vertical" size={25} color='white'/>
      </TouchableOpacity>
    </View>

    {/*   <MediaDisplay
        url={activeTrack.url}
        artwork={activeTrack.artwork}
        isPlaying={isPlaying}
        onVideoEnd={() => setIsPlaying(false)}
        trackType={activeTrack.trackType}
      /> */}
    {/* Affichage de la vidéo */}
    <Video
          source={{ uri: activeTrack.url }} // Utiliser l'URL de la vidéo
          style={styles.video}
          controls={false} // Afficher les contrôles de lecture
          onEnd={() => setIsPlaying(false)}
          onLoad={() => setIsPlaying(true)}
          resizeMode="contain" // Ajuster la vidéo pour qu'elle ne dépasse pas l'écran
        />
      {/* Infos du track + Progress + Controls dans une seule zone qui reste en haut */}
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
  },
  
  bottomSection: {
    flexShrink: 1,
    justifyContent: 'flex-start',
  },
  
  trackInfoContainer: {
    alignItems: 'baseline',
    marginBottom: 12,
  },
  video: {
    width: '100%',
    height: 250, // Ajuster la taille de la vidéo selon tes besoins
    backgroundColor: 'black',
  },
  playlistText: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },

  trackTitleText: {
    fontSize: 20,//18
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',

  },
  trackArtistText: {
    fontSize: 16,//14
    color: 'lightgray',
      textAlign: 'center',
    marginTop: 4,
  },
});export default PlayerScreen;
