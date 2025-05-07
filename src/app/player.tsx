import React, { useRef, useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { useActiveTrack } from 'react-native-track-player';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Video, TextTrackType, SelectedTrackType, ISO639_1 } from 'react-native-video';
import { FontAwesome6 } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Modalize } from 'react-native-modalize';
import { TrackOptionsModal } from '@/components/TrackOptionsModal';

const PlayerScreen = () => {
  const activeTrack = useActiveTrack();
  const { top, bottom } = useSafeAreaInsets();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const modalRef = useRef<Modalize>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<ISO639_1>('en'); // Langue par défaut

// Log activeTrack details
useEffect(() => {
  if (activeTrack) {
    console.log('Active Track Details:', activeTrack);
  }
}, [activeTrack]);


 /*  // Pour récupérer l'URL des sous-titres pour chaque vidéo
  const getSubtitleUri = (trackUrl: string) => {
    // Ici, tu associes un fichier .vtt à chaque URL de track
    if (trackUrl.includes("track1.mp4")) {
      return 'http://localhost:8081/subtitles/track1.vtt';
    } else if (trackUrl.includes("track2.mp4")) {
      return 'http://localhost:8081/subtitles/track2.vtt';
    }
    // Si aucun fichier n'est trouvé, renvoie une URL vide ou nulle
    return null;
  };

  const subtitleUri = activeTrack ? getSubtitleUri(activeTrack.url) : null;
 */
  if (!activeTrack) {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }
   // Extraire les URL des sous-titres disponibles avec le type ISO639_1 pour la langue
   const subtitleTracks = Object.keys(activeTrack.languageTranscriptions).map((lang) => {
    // Vérifie que la langue est dans les codes ISO valides
    const isoLang = lang as ISO639_1; // Type assertion pour garantir la validité du code ISO
    return {
      title: isoLang,
      language: isoLang,
      type: TextTrackType.VTT,
      uri: activeTrack.languageTranscriptions[lang],
    };
    // Fonction pour ouvrir/fermer le modal
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  // Fonction pour sélectionner une langue
  const handleLanguageSelect = (language: ISO639_1) => {
    setSelectedLanguage(language);
    setIsModalVisible(false); // Ferme le modal après sélection
  };
  
  });

  return (
    <LinearGradient style={{ flex: 1 }} colors={['#000', '#000']}>
      <View style={{ paddingTop: top + 40, paddingBottom: bottom + 20 }}>
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

        <View style={{ position: 'relative' }}>
          {/* Video Player */}
          <Video
            source={{ uri: activeTrack.url }}
            style={styles.video}
            controls={true}
            resizeMode="contain"
            onLoad={() => setIsPlaying(true)}
            onEnd={() => setIsPlaying(false)}
            onProgress={({ currentTime }) => setCurrentTime(currentTime)}
           /*  textTracks={
              subtitleUri
                ? [
                    {
                      title: 'Français',
                      language: 'fr',
                      type: TextTrackType.VTT,
                      uri: subtitleUri,
                    },
                    {
                      title: 'Anglais',
                      language: 'en',
                      type: TextTrackType.VTT,
                      uri: subtitleUri,
                    },
                  ]
                : []
            }
            selectedTextTrack={{
              type: SelectedTrackType.LANGUAGE,
              value: 'fr',
            }} */
              textTracks={subtitleTracks}
              selectedTextTrack={{
                type: SelectedTrackType.LANGUAGE,
                value: selectedLanguage,  // La langue sélectionnée
              }}
          />
        </View>

        {/* Track Infos */}
        <View style={styles.bottomSection}>
          <View style={styles.trackInfoContainer}>
            <Text style={styles.trackTitleText}>{activeTrack.title}</Text>
            {activeTrack.artist && (
              <Text numberOfLines={1} style={styles.trackArtistText}>
                {activeTrack.artist}
              </Text>
            )}
          </View>
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
  video: {
    width: '100%',
    height: 250,
    backgroundColor: 'black',
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
function setSelectedLanguage(language: string) {
  throw new Error('Function not implemented.');
}

