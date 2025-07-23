import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { useRouter } from "expo-router";
import { editEpisode } from "@/store/slices/episodeSlice";
import { clearEditEpisode } from "@/store/slices/editEpisodeSlice";
import { Video } from "expo-av";
import { Audio } from "expo-av";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native";

export default function EditEpisodeScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const episode = useSelector((state: RootState) => state.editEpisode.episode);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [audience, setAudience] = useState("");
  const [sound, setSound] = useState<Audio.Sound | null>(null);
const [coverFile, setCoverFile] = useState<{ uri: string; name: string; type: string } | null>(null);

const pickCoverImage = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
  });

  if (!result.canceled) {
    const localUri = result.uri;
    const filename = localUri.split('/').pop() || 'cover.jpg';
    // Déduire le type mime (ici supposé jpeg, tu peux raffiner)
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : `image/jpeg`;

    setCoverFile({ uri: localUri, name: filename, type });
  }
};

  useEffect(() => {
    if (episode) {
      setTitle(episode.title || "");
      setDescription(episode.description || "");
      setTags(episode.tags || []);
      setAudience(episode.audience || "");
    }
  }, [episode]);

  useEffect(() => {
    return () => {
      dispatch(clearEditEpisode());
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

const handleUpdate = async () => {
  if (!title) return Alert.alert("Erreur", "Le titre est obligatoire");

  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("tags", JSON.stringify(tags));
  formData.append("audience", audience);

  if (coverFile) {
    // Important : en React Native, pour FormData, le fichier doit être un objet spécial
    formData.append("cover", {
      uri: coverFile.uri,
      name: coverFile.name,
      type: coverFile.type,
    } as any);
  }

  try {
    await dispatch(
      editEpisode({ id: episode?.id?.toString() || "", data: formData })
    ).unwrap();
    Alert.alert("Succès", "Épisode mis à jour avec succès");
    router.back();
  } catch (error) {
    console.error("Erreur :", error);
    Alert.alert("Erreur", "La mise à jour a échoué");
  }
};


  const playAudio = async () => {
    if (!episode?.audioUrl) return;

    const { sound } = await Audio.Sound.createAsync({ uri: audioSourceUrl });
    setSound(sound);
    await sound.playAsync();
  };

  if (!episode) {
    return (
      <View style={styles.centered}>
        <Text>Chargement de l’épisode...</Text>
      </View>
    );
  }

  const isVideo = episode.videoUrl?.endsWith(".mp4");

  const isAudio = episode.audioUrl?.endsWith(".mp3");

const BASE_URL = Constants.expoConfig?.extra?.apiUrl;
  const audioSourceUrl = episode.audioUrl?.startsWith("http")
    ? episode.audioUrl
    : `${BASE_URL}${episode.audioUrl}`;

  const coverSourceUrl = episode.coverImageUrl?.startsWith("http")
    ? episode.coverImageUrl
    : `${BASE_URL}${episode.coverImageUrl}`;

  const videoSourceUrl = episode.videoUrl?.startsWith("http")
    ? episode.videoUrl
    : `${BASE_URL}${episode.videoUrl}`;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Aperçu de l’épisode</Text>

      {isVideo && (
        <Video
          source={{ uri: videoSourceUrl }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="contain"
          shouldPlay={false}
          useNativeControls
          style={{ width: "100%", height: 200, marginBottom: 16 }}
        />
      )}

      {isAudio && (
        <TouchableOpacity onPress={playAudio} style={styles.audioButton}>
          <Text style={styles.audioText}>▶️ Écouter l’audio</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.label}>Titre</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Titre de l'épisode"
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={description}
        onChangeText={setDescription}
        multiline
        placeholder="Description"
      />

      <Text style={styles.label}>Tags</Text>
      <TextInput
        style={styles.input}
        value={tags.join(", ")}
        onChangeText={(text) =>
          setTags(text.split(",").map((tag) => tag.trim()))
        }
        placeholder="ex: société, culture, art"
      />

      <Text style={styles.label}>Audience</Text>
      <TextInput
        style={styles.input}
        value={audience}
        onChangeText={setAudience}
        placeholder="ex: adultes, tout public"
      />
<TouchableOpacity onPress={pickCoverImage} style={{ marginVertical: 12 }}>
  <Text style={{ color: "#007BFF" }}>Changer la cover</Text>
</TouchableOpacity>

{coverFile ? (
  <Image
    source={{ uri: coverFile.uri }}
    style={{ width: 200, height: 200, borderRadius: 8, marginBottom: 16 }}
  />
) : episode.coverImageUrl ? (
  <Image
    source={{ uri: coverSourceUrl }}
    style={{ width: 200, height: 200, borderRadius: 8, marginBottom: 16 }}
  />
) : (
  <Text>Aucune cover disponible</Text>
)}

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Mettre à jour</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontWeight: "bold",
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginTop: 6,
    borderRadius: 8,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 14,
    borderRadius: 10,
    marginTop: 24,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  audioButton: {
    backgroundColor: "#eee",
    padding: 12,
    borderRadius: 8,
    marginVertical: 12,
    alignItems: "center",
  },
  audioText: {
    fontSize: 16,
  },
});
