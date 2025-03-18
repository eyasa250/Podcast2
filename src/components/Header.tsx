import React from "react";
import { StyleSheet, TextProps } from "react-native";
import { Text } from "react-native-paper";

import theme from "@/core/theme"; // Assure-toi d'importer correctement

type HeaderProps = TextProps & {
  children: React.ReactNode; // 👈 Assure-toi que "children" est défini
};

export default function Header({ children, ...props }: HeaderProps) {
  return (
    <Text style={styles.header} {...props}>
      {children} {/* 👈 Ajoute children ici */}
    </Text>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 21,
    color: theme.colors.primary,
    fontWeight: "bold",
    paddingVertical: 12,
  },
});
