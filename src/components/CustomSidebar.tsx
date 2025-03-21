import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps } from "@react-navigation/drawer";
import { useAuth } from "@/hooks/useAuth";

const CustomSidebar: React.FC<DrawerContentComponentProps> = (props) => {
  const { user, fetchUserInfo } = useAuth();

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <DrawerContentScrollView {...props} style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: user?.avatar || "https://via.placeholder.com/80" }} // Remplace par l'URL réelle de l'avatar
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{user?.name || "Utilisateur"}</Text>
      </View>

      <DrawerItemList {...props} />

      <TouchableOpacity style={styles.blendButton}>
        <Text style={styles.blendButtonText}>Become a Podcaster</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  profileContainer: {
    padding: 20,
    alignItems: "center",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileName: {
    color: "gray",
    marginTop: 10,
    fontSize: 18,
  },
  profileStats: {
    color: "gray",
    fontSize: 14,
  },
  blendButton: {
    padding: 15,
    backgroundColor: "#1db954",
    borderRadius: 10,
    margin: 20,
  },
  blendButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default CustomSidebar;
