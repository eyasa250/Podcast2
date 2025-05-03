/* import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

const UploadScreen = () => {
  const handleSelectFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'video/*',
    });

    if (result.type === 'success') {
      console.log("Fichier sélectionné :", result);
      // Tu peux ici uploader ou enregistrer le fichier
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Importer des vidéos</Text>
      <View style={styles.uploadContainer}>
        <Image
          source={require('@/assets/upload-icon.png')} // À remplacer par ton image d'icône (flèche upload)
          style={styles.uploadIcon}
        />
        <Text style={styles.description}>
          Glissez-déposez les fichiers vidéo que vous souhaitez mettre en ligne
        </Text>
        <Text style={styles.note}>
          Vos vidéos resteront privées jusqu’à leur publication.
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleSelectFile}>
          <Text style={styles.buttonText}>Sélectionner des fichiers</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1E1E1E',
      padding: 20,
    },
    title: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    uploadContainer: {
      flex: 1,
      backgroundColor: '#2A2A2A',
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
    },
    uploadIcon: {
      width: 60,
      height: 60,
      marginBottom: 16,
      tintColor: '#ccc',
    },
    description: {
      color: '#ccc',
      fontSize: 14,
      textAlign: 'center',
      marginBottom: 6,
    },
    note: {
      color: '#888',
      fontSize: 12,
      marginBottom: 20,
      textAlign: 'center',
    },
    button: {
      backgroundColor: '#fff',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 20,
    },
    buttonText: {
      color: '#000',
      fontWeight: 'bold',
    },
  });
  
export default UploadScreen;
 */