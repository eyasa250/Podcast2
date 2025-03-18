import React from "react";

import Background from "@/components/Background";
import BackButton from "@/components/BackButton";
import Header from "@/components/Header";
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";
import Paragraph from "@/components/Paragraph";
import { NavigationProp } from "@react-navigation/native";
import Logo from "@/components/Logo";
type StartScreenProps = {
  navigation: NavigationProp<any>;
};
export default function StartScreen({ navigation }: StartScreenProps) {
  return (
    <Background>
      <Logo />
      <Header>Welcome to Exlogrn</Header>
      <Paragraph>
        A starter app template for React Native Expo, featuring a ready-to-use
        login screen.
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("LoginScreen")}
      >
        Log in
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate("RegisterScreen")}
      >
        Create an account
      </Button>
    </Background>
  );
}
