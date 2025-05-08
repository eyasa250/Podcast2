import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';

interface StepVideoElementsProps {
  videoData: { uri: string | null; name: string };
}

const StepVideoElements = ({ videoData }: StepVideoElementsProps) => {
  const [chapterTitle, setChapterTitle] = useState('');
  const [chapterTime, setChapterTime] = useState('');

  const handleAddChapter = () => {
    // Logic to add the chapter (or any other video elements)
    console.log('Chapitre ajouté:', chapterTitle, chapterTime);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Titre du chapitre</Text>
      <TextInput
        placeholder="Titre du chapitre"
        style={styles.input}
        value={chapterTitle}
        onChangeText={setChapterTitle}
      />

      <Text style={styles.label}>Temps du chapitre (en secondes)</Text>
      <TextInput
        placeholder="Exemple: 120"
        style={styles.input}
        keyboardType="numeric"
        value={chapterTime}
        onChangeText={setChapterTime}
      />

      <Button title="Ajouter un chapitre" onPress={handleAddChapter} />

      {/* Affichage du nom du fichier vidéo sélectionné */}
      {videoData.name && (
        <View style={styles.videoInfoContainer}>
          <Text style={styles.videoInfoText}>Vidéo sélectionnée : {videoData.name}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 6,
    marginBottom: 16,
  },
  videoInfoContainer: {
    marginTop: 16,
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 6,
  },
  videoInfoText: {
    color: '#333',
  },
});

export default StepVideoElements;
