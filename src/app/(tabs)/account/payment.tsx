import { router, Stack } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

export default function PaymentScreen() {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");

  const handlePayment = () => {
    // Logique de paiement (par exemple, appel API pour payer)
    console.log("Détails de paiement:", { cardNumber, expiryDate, cvv, name });
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Paiement</Text>
        <View style={styles.card}>
          <Text style={styles.subHeader}>Détails de la carte</Text>

          {/* Nom sur la carte */}
          <TextInput
            style={styles.input}
            placeholder="Nom sur la carte"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />

          {/* Numéro de carte */}
          <TextInput
            style={styles.input}
            placeholder="Numéro de carte"
            value={cardNumber}
            onChangeText={setCardNumber}
            keyboardType="numeric"
            maxLength={19} // Format standard pour les cartes de paiement
          />

          {/* Date d'expiration */}
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.halfWidth]}
              placeholder="MM/AA"
              value={expiryDate}
              onChangeText={setExpiryDate}
              keyboardType="numeric"
              maxLength={5} // Format MM/AA
            />
            {/* CVV */}
            <TextInput
              style={[styles.input, styles.halfWidth]}
              placeholder="CVV"
              value={cvv}
              onChangeText={setCvv}
              keyboardType="numeric"
              maxLength={3}
            />
          </View>

          {/* Bouton de paiement */}
          <TouchableOpacity style={styles.button} onPress={() => router.push("/profile")}>
            <Text style={styles.buttonText}>Payer maintenant</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FC",
    padding: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2E3A59",
    textAlign: "center",
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
    color: "#1A237E",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#F9F9F9",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfWidth: {
    width: "48%",
  },
  button: {
    backgroundColor: "#6200EE", // Couleur bleu/violet moderne
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});
