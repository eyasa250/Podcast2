// components/PremiumCard.tsx
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";

const PremiumCard = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://via.placeholder.com/300x200" }}
        style={styles.image}
      />
      <Text style={styles.title}>Passez à Premium</Text>
      <Text style={styles.description}>
        Débloquez du contenu exclusif, profitez d'une expérience sans pub et bien plus encore !
      </Text>
      <View style={styles.benefitsContainer}>
        <Text style={styles.benefit}>✅ Accès illimité aux fonctionnalités</Text>
        <Text style={styles.benefit}>✅ Contenu exclusif</Text>
        <Text style={styles.benefit}>✅ Aucune publicité</Text>
        <Text style={styles.benefit}>✅ Support prioritaire</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => router.push("/account/plans")}>
        <Text style={styles.buttonText}>Passer à Premium</Text>
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
