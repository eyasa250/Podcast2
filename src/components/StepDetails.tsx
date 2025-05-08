import React from 'react';
import { View, Text, TextInput, StyleSheet} from 'react-native';

const StepDetails = ({
  formData,
  setFormData,
}: {
  formData: EpisodeFormData;
  setFormData: React.Dispatch<React.SetStateAction<EpisodeFormData>>;
})  => {
  const { videoData, title, description, playlist } = formData;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Titre</Text>
      <TextInput
        style={styles.input}
        placeholder="Titre de l'épisode"
        value={title}
        onChangeText={(text) => setFormData({ ...formData, title: text })}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Décrivez l'épisode..."
        multiline
        value={description}
        onChangeText={(text) => setFormData({ ...formData, description: text })}
      />

      <Text style={styles.label}>Playlist</Text>
      <TextInput
        style={styles.input}
        placeholder="Nom de la playlist"
        value={playlist}
        onChangeText={(text) => setFormData({ ...formData, playlist: text })}
      />

      <Text style={styles.label}>Audience</Text>
      <Picker
        selectedValue={audience}
        onValueChange={(value) => setFormData({ ...formData, audience: value })}
        style={styles.input}
      >
        <Picker.Item label="Oui, c’est pour les enfants" value="kids" />
        <Picker.Item label="Non, ce n’est pas pour les enfants" value="general" />
      </Picker>

      {videoData?.uri && (
        <View style={styles.previewContainer}>
          <Text style={styles.label}>Aperçu vidéo</Text>
          <Video
            source={{ uri: videoData.uri }}
            style={{ width: '100%', height: 200 }}
            useNativeControls
           resizeMode={ResizeMode.CONTAIN} />
         
        </View>
      )}
    </View>
  );
};

import { ResizeMode, Video } from 'expo-av';
import { EpisodeFormData } from '@/hooks/useEpisodeForm';
import { Picker } from '@react-native-picker/picker';

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
