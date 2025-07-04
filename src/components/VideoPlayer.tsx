import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
} from 'react-native';
import Video, { ISO639_1, TextTrackType } from 'react-native-video';

interface TextTrack {
  title: string;
  language: ISO639_1;
  type: TextTrackType;
  uri: string;
}

interface Props {
  url: string;
  textTracks?: TextTrack[];
}

export const VideoPlayer = ({ url, textTracks = [] }: Props) => {
  const [selectedLanguage, setSelectedLanguage] = useState<ISO639_1>('fr');
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Video
        source={{ uri: url }}
        style={styles.video}
        controls
        resizeMode="contain"
        textTracks={textTracks}
        selectedTextTrack={{
          type: 'language',
          value: selectedLanguage,
        }}
        onError={(e) => console.error('Video error:', e)}
      />

      {/* 🈯 Bouton "Langue" */}
      {textTracks.length > 1 && (
        <TouchableOpacity
          style={styles.languageSelectorButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.languageSelectorText}>
            🈯 Langue: {selectedLanguage.toUpperCase()}
          </Text>
        </TouchableOpacity>
      )}

      {/* 📋 Modal de sélection */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choisir une langue</Text>
            {textTracks.map((track) => (
              <TouchableOpacity
                key={track.language}
                onPress={() => {
                  setSelectedLanguage(track.language);
                  setModalVisible(false);
                  console.log(`🌐 Langue sélectionnée : ${track.language}`);
                }}
                style={[
                  styles.modalOption,
                  selectedLanguage === track.language &&
                    styles.modalOptionSelected,
                ]}
              >
                <Text
                  style={[
                    styles.modalOptionText,
                    selectedLanguage === track.language &&
                      styles.modalOptionTextSelected,
                  ]}
                >
                  {track.title}
                </Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.modalClose}
            >
              <Text style={styles.modalCloseText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    width: '100%',
    height: 300,
    marginBottom: 10,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  languageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: '#111',
  },
  languageButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#888',
  },
  languageButtonActive: {
    backgroundColor: '#444',
    borderColor: '#fff',
  },
  languageText: {
    color: '#ccc',
    fontSize: 14,
  },
  languageTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  languageSelectorButton: {
  alignSelf: 'center',
  backgroundColor: '#333',
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 8,
  marginTop: 10,
},
languageSelectorText: {
  color: 'white',
  fontSize: 14,
},

modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.6)',
  justifyContent: 'center',
  alignItems: 'center',
},
modalContent: {
  width: 300,
  backgroundColor: '#fff',
  borderRadius: 8,
  padding: 20,
  alignItems: 'center',
},
modalTitle: {
  fontSize: 16,
  fontWeight: 'bold',
  marginBottom: 16,
},
modalOption: {
  paddingVertical: 10,
  width: '100%',
  alignItems: 'center',
},
modalOptionSelected: {
  backgroundColor: '#eee',
  borderRadius: 5,
},
modalOptionText: {
  fontSize: 14,
  color: '#333',
},
modalOptionTextSelected: {
  fontWeight: 'bold',
  color: '#000',
},
modalClose: {
  marginTop: 20,
},
modalCloseText: {
  color: 'blue',
  fontSize: 14,
},

});
