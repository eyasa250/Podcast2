import React from "react";
import Background from "@/components/Background";
import BackButton from "@/components/BackButton";
import Logo from "@/components/Logo";
import Header from "@/components/Header";
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";
import Paragraph from "@/components/Paragraph";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter(); // Expo Router pour la navigation

  return (
    <Background>
      <Logo />
      <Header>Welcome to Exlogrn</Header>
      <Paragraph>
        A starter app template for React Native Expo, featuring a ready-to-use
        login screen.
      </Paragraph>
      <Button mode="contained" onPress={() => router.push("/auth/login")}>
        Log in
      </Button>
      <Button mode="outlined" onPress={() => router.push("/auth/register")}>
        Create an account
      </Button>
    </Background>
  );
}
