import theme from "@/core/theme";
import { router, useNavigation } from "expo-router";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

export default function PremiumScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Image d'illustration */}
      <Image
        source={{ uri: "https://via.placeholder.com/300x200" }}
        style={styles.image}
      />

      {/* Titre et description */}
      <Text style={styles.title}>Passez à Premium</Text>
      <Text style={styles.description}>
        Débloquez du contenu exclusif, profitez d'une expérience sans pub et bien plus encore !
      </Text>

      {/* Liste des avantages */}
      <View style={styles.benefitsContainer}>
        <Text style={styles.benefit}>✅ Accès illimité aux fonctionnalités</Text>
        <Text style={styles.benefit}>✅ Contenu exclusif</Text>
        <Text style={styles.benefit}>✅ Aucune publicité</Text>
        <Text style={styles.benefit}>✅ Support prioritaire</Text>
      </View>

      {/* Bouton d'abonnement */}
      <TouchableOpacity style={styles.button}  onPress={() => router.push("/account/plans")}
      >
        <Text style={styles.buttonText}>Passer à Premium</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.background,
    padding: 20,
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginVertical: 10,
  },
  benefitsContainer: {
    marginTop: 15,
    alignItems: "flex-start",
    width: "100%",
    paddingHorizontal: 30,
  },
  benefit: {
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#FFD700",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
});
