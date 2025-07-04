// components/PremiumCTAButton.tsx
import { router } from "expo-router";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function PremiumCTAButton() {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => router.push("/account/plans")}
    >
      <Text style={styles.buttonText}>Passer à Premium</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
