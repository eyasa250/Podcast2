import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { createPodcast } from "@/services/podcastApi"; // ⚠️ Assure-toi que le chemin est correct

export default function CreatepodcastScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleCreate = async () => {
    if (!title.trim()) {
      Alert.alert("Erreur", "Le nom de la podcast est requis.");
      return;
    }

    try {
      const newPodcast = await createPodcast(title, description);
      console.log("Podcast créé :", newPodcast);
      Alert.alert("Succès", "Podcast créée avec succès !");
      router.push("/(tabs)/podcasts"); // Redirection vers la liste
    } catch (error: any) {
      console.error("Erreur API:", error);
      Alert.alert("Erreur", error?.response?.data?.message || "Échec de la création du podcast.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Créer une nouvelle podcast</Text>

      <TextInput
        style={styles.input}
        placeholder="Nom de la podcast"
        placeholderTextColor="#888"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Description (optionnelle)"
        placeholderTextColor="#888"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity style={styles.button} onPress={handleCreate}>
        <Text style={styles.buttonText}>Créer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "center",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#f1f1f1",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
