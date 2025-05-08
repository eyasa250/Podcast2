// StepUpload.tsx
import { Video, ResizeMode } from 'expo-av';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import React, { useState, useEffect } from 'react';

export default function StepUpload({ formData, setFormData }: any) {
  const [videoUri, setVideoUri] = useState<string | null>(formData.videoData?.uri || null);
  const [videoName, setVideoName] = useState('');

  const pickVideo = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'video/*',
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const name = result.assets[0].name;

      setVideoUri(uri);
      setVideoName(name);

      // Mettre à jour formData
      setFormData((prev: any) => ({
        ...prev,
        videoData: { uri },
      }));
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dropZone} onPress={pickVideo}>
        <Text style={styles.text}>
          {videoName || videoUri ? 'Changer la vidéo' : 'Sélectionner une vidéo'}
        </Text>
      </TouchableOpacity>

      {videoUri && (
        <Video
          source={{ uri: videoUri }}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          style={{ width: '100%', height: 200, marginTop: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  dropZone: {
    backgroundColor: '#1e1e1e',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
});
