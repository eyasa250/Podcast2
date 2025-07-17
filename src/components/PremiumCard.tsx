// components/PremiumCard.tsx
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";

const PremiumCard = () => {
  return (
     <View style={styles.container}>
      <Text style={styles.title}>Become Premium</Text>
      <Text style={styles.description}>
        Unlock exclusive content, enjoy an ad-free experience, and much more!
      </Text>
      <View style={styles.benefitsContainer}>
        <Text style={styles.benefit}>✅ Unlimited access to all features</Text>
        <Text style={styles.benefit}>✅ Exclusive content</Text>
        <Text style={styles.benefit}>✅ No advertisements</Text>
        <Text style={styles.benefit}>✅ Priority support</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => router.push("/account/plans")}>
        <Text style={styles.buttonText}>Upgrade to Premium</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginVertical: 20,
    marginHorizontal: 20,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
    marginVertical: 10,
  },
  benefitsContainer: {
    marginTop: 10,
    alignItems: "flex-start",
  },
  benefit: {
    fontSize: 14,
    marginBottom: 4,
  },
  button: {
    marginTop: 16,
    backgroundColor: "#FFD700",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PremiumCard;
