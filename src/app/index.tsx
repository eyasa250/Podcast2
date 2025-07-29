import React, { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(null);

  useEffect(() => {
    const checkOnboarding = async () => {
      const value = await AsyncStorage.getItem("hasSeenOnboarding");
      setHasSeenOnboarding(value === "true");
    };

    checkOnboarding();
  }, []);

  if (hasSeenOnboarding === null) return null; // ou un splash screen temporaire

  return hasSeenOnboarding ? (
    <Redirect href="/(tabs)/home" />
  ) : (
    <Redirect href="/OnboardingScreen" />
  );
}
