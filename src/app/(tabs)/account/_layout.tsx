import React from "react";
import { Stack } from "expo-router";
import { useAppSelector } from "@/hooks/reduxHooks";

export default function AccountLayout() {
  const { user, loading } = useAppSelector((state) => state.auth);

  if (loading) return null;

  const currentScreen = user ? "profileScreen" : "auth";

  return (
    <Stack>
      <Stack.Screen name={currentScreen} options={{ headerShown: false }} />
    </Stack>
  );
}
