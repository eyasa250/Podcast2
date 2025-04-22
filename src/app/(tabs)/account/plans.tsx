import { router, Stack } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

const plans = [
  {
    name: "Basic",
    price: "5€ / mois",
    features: ["Contenu exclusif", "Support standard"],
  },
  {
    name: "Premium",
    price: "10€ / mois",
    features: ["Contenu exclusif", "Aucune pub", "Support prioritaire"],
  },
  {
    name: "Ultimate",
    price: "20€ / mois",
    features: [
      "Tout ce qui est inclus",
      "Mentorat 1:1",
      "Accès anticipé aux nouveautés",
    ],
  },
];

export default function PlansScreen() {
  const handleSelectPlan = (planName: string) => {
    // Action à faire quand l'utilisateur choisit un plan
    console.log(`Plan choisi : ${planName}`);
    // Tu peux faire un achat, changer le rôle, ou rediriger vers une page checkout
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Choisissez votre plan</Text>
        {plans.map((plan, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.planName}>{plan.name}</Text>
            <Text style={styles.price}>{plan.price}</Text>
            {plan.features.map((feature, idx) => (
              <Text key={idx} style={styles.feature}>• {feature}</Text>
            ))}
            <TouchableOpacity
              style={styles.button}
            onPress={() => router.push("/account/payment")}
            >
              <Text style={styles.buttonText}>Choisir {plan.name}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#F4F6FC", // Couleur d'arrière-plan douce
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#2E3A59", // Couleur de texte plus moderne
    textAlign: "center",
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    transform: [{ translateY: 0 }],
  },
  cardHovered: {
    transform: [{ scale: 1.05 }],
  },
  planName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1A237E", // Titre plan en couleur foncée
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    color: "#616161",
    marginBottom: 15,
  },
  feature: {
    fontSize: 16,
    color: "#424242",
    marginBottom: 8,
  },
  button: {
    marginTop: 15,
    backgroundColor: "#6200EE", // Bouton moderne avec un bleu/violet attrayant
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#fff",
  },
});
