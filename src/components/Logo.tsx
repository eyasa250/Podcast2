import React from "react";
import { Image, StyleSheet } from "react-native";

export default function Logo(): JSX.Element {
  return (
    <Image
      source={require("@/assets/items/logo.jpeg")}
      style={styles.image}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 45,
    marginBottom: 8,
  },
});
