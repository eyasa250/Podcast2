import React, { ReactNode } from "react";
import { StyleSheet, TextProps } from "react-native";
import { Text } from "react-native-paper";

type ParagraphProps = TextProps & {
  children: ReactNode;
};

export default function Paragraph({ children, ...props }: ParagraphProps) {
  return (
    <Text style={styles.text} {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    lineHeight: 21,
    textAlign: "center",
    marginBottom: 12,
  },
});
