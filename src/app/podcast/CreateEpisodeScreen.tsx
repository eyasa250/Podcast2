import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, Switch } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { uploadEpisode } from '@/services/episodeApi';

export default function CreateEpisodePage() {
  const { id } = useLocalSearchParams();
  const podcastId = Array.isArray(id) ? id[0] : id;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [trackType, setTrackType] = useState<'AUDIO' | 'VIDEO'>('AUDIO');
  const [audience, setAudience] = useState<'GENERAL' | 'ADULT'>('GENERAL');
  const [subtitles, setSubtitles] = useState(false);
  const [soundEnhancement, setSoundEnhancement] = useState(false);
  const [tags, setTags] = useState('');
  const [mediaFile, setMediaFile] = useState<any>(null);
  const [imageFile, setImageFile] = useState<any>(null);

  const pickMediaFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: 'video/*' });
    if (!result.canceled && result.assets.length > 0) {
      setMediaFile(result.assets[0]);
    }
  };

  const pickImageFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: 'image/*' });
    if (!result.canceled && result.assets.length > 0) {
      setImageFile(result.assets[0]);
    }
  };

 const handleSubmit = async () => {
  if (!mediaFile) {
    Alert.alert('Veuillez sélectionner un fichier média.');
    return;
  }

  try {
    const formData = new FormData();

    formData.append('title', title);
    formData.append('description', description);
    formData.append('trackType', trackType);
    formData.append('audience', audience);
    formData.append('subtitles', subtitles.toString());
    formData.append('soundEnhancement', soundEnhancement.toString());

    tags.split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0)
      .forEach(tag => formData.append('tags[]', tag));

    formData.append('files', {
      uri: mediaFile.uri,
      name: mediaFile.name,
      type: mediaFile.mimeType || (trackType === 'AUDIO' ? 'audio/mpeg' : 'video/mp4'),
    } as any);

    if (imageFile) {
      formData.append('files', {
        uri: imageFile.uri,
        name: imageFile.name,
        type: imageFile.mimeType || 'image/jpeg',
      } as any);
    }
    console.log(' FormData Final:', formData);

    const data = await uploadEpisode(podcastId!, formData);

    console.log("Réponse serveur :", data);
    Alert.alert("Succès", "Épisode créé avec succès !");
  } catch (error) {
    console.error("Erreur lors de l'envoi :", error);
    Alert.alert("Erreur", "Une erreur s’est produite lors de la création de l’épisode.");
  }
};


  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24 }}>Créer un épisode</Text>
      <TextInput placeholder="Titre" value={title} onChangeText={setTitle} style={{ borderBottomWidth: 1, marginVertical: 8 }} />
      <TextInput placeholder="Description" value={description} onChangeText={setDescription} style={{ borderBottomWidth: 1, marginVertical: 8 }} />
      <TextInput placeholder="Tags (séparés par des virgules)" value={tags} onChangeText={setTags} style={{ borderBottomWidth: 1, marginVertical: 8 }} />

      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 }}>
        <Button title="Audio" onPress={() => setTrackType('AUDIO')} />
        <Button title="Vidéo" onPress={() => setTrackType('VIDEO')} />
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 }}>
        <Button title="Général" onPress={() => setAudience('GENERAL')} />
        <Button title="Adulte" onPress={() => setAudience('ADULT')} />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <Text>Sous-titres</Text>
        <Switch value={subtitles} onValueChange={setSubtitles} />
        <Text>Amélioration audio</Text>
        <Switch value={soundEnhancement} onValueChange={setSoundEnhancement} />
      </View>

      <Button title="Sélectionner fichier média" onPress={pickMediaFile} />
      <Text>{mediaFile ? mediaFile.name : 'Aucun fichier média sélectionné'}</Text>

      <Button title="Sélectionner image de couverture" onPress={pickImageFile} />
      <Text>{imageFile ? imageFile.name : 'Aucune image sélectionnée'}</Text>

      <Button title="Envoyer" onPress={handleSubmit} color="#007AFF" />
    </View>
  );
}
