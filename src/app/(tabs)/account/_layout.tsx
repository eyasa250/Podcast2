import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Stack } from "expo-router";
import { useAuth } from "@/hooks/useAuth"; // Ton hook personnalisé

export default function AccountLayout() {
  const { user, loading } = useAuth();
  const [currentScreen, setCurrentScreen] = useState("auth");

  useEffect(() => {
    console.log("User:", user);

    if (user) {
      if (user.role === "PODCASTER") {
        setCurrentScreen("ChatIntroScreen");
          console.log(currentScreen)     
         } else if (user.role === "AUDITOR") {
        setCurrentScreen("premium");
      } else {
        setCurrentScreen("premium"); 
      }
    } else {
      setCurrentScreen("auth");
    }
  }, [user]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name={currentScreen} options={{ headerShown: false }} />
      </Stack>
    </View>
  );
}
