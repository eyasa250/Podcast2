import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import { createPodcast, getPodcastById, updatePodcast } from "@/services/podcastApi"; // ⚠️ Make sure the path is correct
import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { addPodcast, editPodcast  } from "@/store/slices/podcastSlice";
import { resetEditPodcast } from "@/store/slices/editPodcastSlice";

export default function PodcastFormScreenScreen() {
    const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

const dispatch = useAppDispatch();
const { mode, podcastId } = useAppSelector((state) => state.editPodcast);

useEffect(() => {
  const loadPodcast = async () => {
    if (mode  && podcastId != null) {
      try {
        const podcast = await getPodcastById(Number(podcastId));
        console.log("✅ Podcast trouvé:", podcast);
        setTitle(podcast.title);
        setDescription(podcast.description);
        setCategory(podcast.category);
        setImage(podcast.coverImageUrl);
      } catch (error) {
        console.error("❌ Erreur lors du chargement du podcast:", error);
      }
    } else {
     setTitle("");
      setDescription("");
      setCategory("");
      setImage("");    }
  };

  loadPodcast();
}, [podcastId, mode]);


const pickImage = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
  });

  if (!result.canceled) {
    setImage(result.assets[0].uri);
  }
};

const handleCreate = async () => {
  if (!title.trim()) return Alert.alert("Error", "Title required.");
  if (!category) return Alert.alert("Error", "Category required.");

  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("category", category);

  if (image && !image.startsWith("http")) {
    const fileName = image.split("/").pop();
    const ext = /\.(\w+)$/.exec(fileName || '')?.[1] || "jpg";

    formData.append("coverImage", {
      uri: image,
      name: fileName,
      type: `image/${ext}`,
    } as any);
  }

  try {
    if (mode ) {
    await dispatch(editPodcast({ id: Number(podcastId), formData }));
      Alert.alert("Updated!", "Podcast updated successfully.");
    } else {
      await dispatch(addPodcast(formData));
      Alert.alert("Created!", "Podcast created successfully.");
    }dispatch(resetEditPodcast());

    router.back();
  } catch (error: any) {
    Alert.alert("Error", error?.response?.data?.message || "An error occurred.");
  }
};



  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create a New Podcast</Text>

      <TextInput
        style={styles.input}
        placeholder="Podcast title"
        placeholderTextColor="#888"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Description (optional)"
        placeholderTextColor="#888"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />
<TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
  {image ? (
    <Image
      source={{ uri: image }}
      style={styles.imagePreview}
      resizeMode="cover"
    />
  ) : (
    <Text style={styles.imagePlaceholder}>+ Add Cover Image</Text>
  )}
</TouchableOpacity>


      <Text style={styles.label}>Category</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
        >
          <Picker.Item label="Select a category..." value="" />
          <Picker.Item label="Education" value="EDUCATION" />
          <Picker.Item label="Entertainment" value="ENTERTAINMENT" />
          <Picker.Item label="Technology" value="TECHNOLOGY" />
          <Picker.Item label="Health" value="HEALTH" />
          <Picker.Item label="Music" value="MUSIC" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleCreate}>
        <Text style={styles.buttonText}>Create</Text>
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
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "500",
  },
  pickerContainer: {
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    marginBottom: 15,
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
  imagePicker: {
  height: 100,
  width: "100%",
  borderRadius: 8,
  borderWidth: 2,
  borderColor: "#ccc",
  borderStyle: "dashed",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#f9f9f9",
  marginBottom: 15,
},

imagePreview: {
  height: "100%",
  width: "100%",
  borderRadius: 8,
},

imagePlaceholder: {
  fontSize: 16,
  color: "#888",
}

});
