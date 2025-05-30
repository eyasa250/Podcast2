import React from "react";
import { Image, StyleSheet } from "react-native";

export default function Logo(): JSX.Element {
  return (
    <Image
      source={require("@/assets/items/logo.png")}
      style={styles.image}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 110,
    height: 110,
    marginBottom: 8,
  },
});
