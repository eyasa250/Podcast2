import React, { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { useAppSelector } from "@/hooks/reduxHooks";

export default function AccountLayout() {
  const { user, loading } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      // Rediriger vers /tabs/account/auth si l'utilisateur est déconnecté
      router.replace("/(tabs)/account/auth");
    }
  }, [user, loading]);

  if (loading) return null;

  return (
    <Stack>
      <Stack.Screen name={user ? "profileScreen" : "auth"} options={{ headerShown: false }} />
    </Stack>
  );
}
