import { Video, ResizeMode } from 'expo-av';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { EpisodeFormData } from '@/types';
interface StepUploadProps {
  formData: EpisodeFormData;
  setMediaFile: (data: { uri: string; name: string }) => void;
}
export default function StepUpload({ formData, setMediaFile }: StepUploadProps) {
  const [videoUri, setVideoUri] = useState<string | null>(formData.mediaFile?.uri || null);
  const [videoName, setVideoName] = useState(formData.mediaFile?.name || '');
  const [loading, setLoading] = useState(false);

 /*  const pickVideo = async () => {
    setLoading(true);
    const result = await DocumentPicker.getDocumentAsync({
      type: 'video/*',
    });

    if (!result.canceled && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      const name = result.assets[0].name;

      setVideoUri(uri);
      setVideoName(name);

      updateVideoData({ uri, name }); // ✅ Met à jour via le hook useEpisodeForm
    }
    setLoading(false);
  }; */
  const pickMediaFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: 'video/*' });
    if (!result.canceled && result.assets.length > 0) {
      setMediaFile(result.assets[0]);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dropZone} onPress={pickMediaFile} disabled={loading}>
        <Icon name="cloud-upload-outline" size={40} color="#aaa" />
        <Text style={styles.text}>
          {videoName || videoUri ? 'Changer la vidéo' : 'Sélectionner une vidéo'}
        </Text>
        {videoName ? <Text style={styles.fileName}>{videoName}</Text> : null}
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#1db954" style={{ marginTop: 20 }} />}

      {videoUri && !loading && (
        <Video
          source={{ uri: videoUri }}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          style={styles.video}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'flex-start',
  },
  dropZone: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  text: {
    color: '#ccc',
    fontSize: 18,
    fontWeight: '600',
  },
  fileName: {
    color: '#888',
    marginTop: 5,
    fontSize: 14,
  },
  video: {
    width: '100%',
    height: 220,
    marginTop: 20,
    borderRadius: 12,
  },
  nextButton: {
    marginTop: 40,
    backgroundColor: '#1db954',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: '#555',
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
});
