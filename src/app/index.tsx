/* import React from "react";
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
      <Header>Welcome to Podcasty</Header>
  
      <Button mode="outlined" onPress={() => router.push("/auth/login")}>
        Log in
      </Button>
      <Button mode="outlined" onPress={() => router.push("/auth/register")}>
        Create an account
      </Button>
   
    </Background>
  );
}
 */
// app/index.tsx
import { Redirect } from "expo-router";

export default function Index() {
  return <Redirect href="/(tabs)/home" />;
}
