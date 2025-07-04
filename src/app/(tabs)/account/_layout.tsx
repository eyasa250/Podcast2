/* import React, { useEffect, useState, useCallback } from "react";
import { Stack } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import AvatarButton from "@/components/AvatarButton";

export default function AccountLayout() {
  const { user, loading } = useAuth();
  const [currentScreen, setCurrentScreen] = useState("auth");

  useEffect(() => {
    if (user) {
      if (user.role === "PODCASTER") {
        setCurrentScreen("ChatIntroScreen");
      } else {
        setCurrentScreen("premium");
      }
    } else {
      setCurrentScreen("auth");
    }
  }, [user]);

  if (loading) {
    return null; // ou un petit loading si tu veux
  }

  return (
    <Stack>
      <Stack.Screen
        name={currentScreen}
        options={{
          headerTitle: "Account",
          headerRight: () => (user ? <AvatarButton /> : null),
          headerShown: false 
        }}
      />
    </Stack>
  );
}
 */
import React, { useEffect, useState, useCallback } from "react";
import { Stack } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import AvatarButton from "@/components/AvatarButton";

export default function AccountLayout() {
  const { user, loading } = useAuth();
  const [currentScreen, setCurrentScreen] = useState("auth");

  useEffect(() => {
    if (user) {
              setCurrentScreen("profileScreen");
    } else {
      setCurrentScreen("auth");
    }
  }, [user]);

  if (loading) {
    return null; // ou un petit loading si tu veux
  }

  return (
    <Stack>
      <Stack.Screen
        name={currentScreen}
        options={{
         /*  headerTitle: "Account",
          headerRight: () => (user ? <AvatarButton /> : null),
         */  headerShown: false 
        }}
      />
    </Stack>
  );
}