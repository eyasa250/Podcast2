import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Ionicons } from '@expo/vector-icons';

export default function VideoUploader() {
  const pickVideo = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'video/*',
    });

    if (!result.canceled) {
      console.log('Video file:', result.assets[0].uri);
      // Tu peux uploader ici ou prévisualiser la vidéo
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dropZone} onPress={pickVideo}>
        <Ionicons name="cloud-upload-outline" size={64} color="#aaa" />
        <Text style={styles.text}>Glissez-déposez ou appuyez pour sélectionner une vidéo</Text>
        <TouchableOpacity style={styles.button} onPress={pickVideo}>
          <Text style={styles.buttonText}>Sélectionner des fichiers</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  dropZone: {
    backgroundColor: '#1e1e1e',
    padding: 40,
    borderRadius: 10,
    alignItems: 'center',
    borderColor: '#555',
    borderWidth: 2,
  },
  text: {
    color: '#ccc',
    textAlign: 'center',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});
