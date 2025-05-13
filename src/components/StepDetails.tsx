import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { ResizeMode, Video } from 'expo-av';
import { EpisodeFormData } from '@/hooks/useEpisodeForm';

const StepDetails = ({
  formData,
  setFormData,
}: {
  formData: EpisodeFormData;
  setFormData: (field: keyof EpisodeFormData, value: any) => void;
}) => {
  const { videoData, title, description, playlist } = formData;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Titre</Text>
      <TextInput
        style={styles.input}
        placeholder="Titre de l'épisode"
        value={title}
        onChangeText={(text) => setFormData('title', text)}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Décrivez l'épisode..."
        multiline
        value={description}
        onChangeText={(text) => setFormData('description', text)}
      />

      <Text style={styles.label}>Podcast</Text>
      <TextInput
        style={styles.input}
        placeholder="Nom de la playlist"
        value={playlist}
        onChangeText={(text) => setFormData('playlist', text)}
      />

      {videoData?.uri && (
        <View style={styles.previewContainer}>
          <Text style={styles.label}>Aperçu vidéo</Text>
          <Video
            source={{ uri: videoData.uri }}
            style={{ width: '100%', height: 200 }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  label: { fontWeight: 'bold', marginTop: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 6,
    marginTop: 4,
  },
  previewContainer: { marginTop: 16 },
});

export default StepDetails;
