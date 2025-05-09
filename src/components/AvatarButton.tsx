// 📌 components/AvatarButton.tsx
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "@/core/theme";
import { router } from "expo-router";

const AvatarButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
       onPress={() => router.push("/profile")} // ✅ Correction ici
      style={styles.avatar}
    >
      <Text style={styles.avatarText}>S</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  avatar: {
    marginLeft: 15,
    backgroundColor: colors.primary,
    width: 50,
    height: 50,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default AvatarButton;
