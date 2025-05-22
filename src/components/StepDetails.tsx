import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, Pressable, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ResizeMode, Video } from 'expo-av';
import { EpisodeFormData } from '@/types';
import * as DocumentPicker from 'expo-document-picker';

interface StepDetailsProps {
  formData: EpisodeFormData;
  setFormData: <K extends keyof EpisodeFormData>(
    field: K,
    value: EpisodeFormData[K]
  ) => void;
}
const StepDetails = ({ formData, setFormData }: StepDetailsProps) => {

  const { mediaFile, title, description, imageFile } = formData;


const pickImageFile = async () => {
  const result = await DocumentPicker.getDocumentAsync({ type: 'image/*' });
  if (!result.canceled && result.assets.length > 0) {
    setFormData('imageFile', result.assets[0]);
  }
};
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Titre</Text>
      <TextInput
        style={styles.input}
        placeholder="Episode Title"
        placeholderTextColor="#888"
        value={title}
        onChangeText={(text) => setFormData('title', text)}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Describe the episode"
        placeholderTextColor="#888"
        multiline
        value={description}
        onChangeText={(text) => setFormData('description', text)}
      />

      <Text style={styles.label}>Image de couverture</Text>
      {imageFile?.uri ? (
        <Image source={{ uri: imageFile.uri }} style={styles.imageFile} />
      ) : (
        <Text style={{ color: '#999' }}>Aucune image sélectionnée</Text>
      )}
      <Pressable onPress={pickImageFile} style={styles.coverButton}>
        <Text style={styles.coverButtonText}>Choisir une image</Text>
      </Pressable>

      {mediaFile?.uri && (
        <View style={styles.previewContainer}>
          <Text style={styles.label}>Preview Vidéo</Text>
          <Video
            source={{ uri: mediaFile.uri }}
            style={styles.video}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    flex: 1,
  },
  label: {
    fontWeight: '600',
    fontSize: 16,
    color: '#444',
    marginBottom: 6,
    marginTop: 20,
  },
  input: {
    backgroundColor: '#f9f9f9',
    color: '#222',
    padding: 14,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  imageFile: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginTop: 10,
    backgroundColor: '#eee',
  },
  coverButton: {
    marginTop: 10,
    backgroundColor: '#444',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  coverButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  previewContainer: {
    marginTop: 30,
  },
  video: {
    width: '100%',
    height: 220,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#000',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
});

export default StepDetails;
