import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import { createPodcast } from "@/services/podcastApi"; // ⚠️ Make sure the path is correct
import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native";

export default function CreatePodcastScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
    const [image, setImage] = useState("");

  const router = useRouter();
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
  if (!title.trim()) {
    Alert.alert("Error", "Podcast title is required.");
    return;
  }

  if (!category) {
    Alert.alert("Error", "Please select a category.");
    return;
  }

  try {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);

    if (image) {
      const fileName = image.split("/").pop();
      const match = /\.(\w+)$/.exec(fileName || '');
      const ext = match?.[1] ?? "jpg";

      formData.append("coverImage", {
        uri: image,
        name: fileName,
        type: `image/${ext}`,
      } as any); // `as any` pour éviter l'erreur de type
    }

    const response = await createPodcast(formData); // ⚠️ change cette fonction
    console.log("Podcast created:", response);
    Alert.alert("Success", "Podcast created successfully!");
    router.back()  
} catch (error: any) {
    console.error("API error:", error);
    Alert.alert("Error", error?.response?.data?.message || "Failed to create podcast.");
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
