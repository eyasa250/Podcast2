import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Stack } from "expo-router";
import { useAuth } from "@/hooks/useAuth"; // Importer ton hook useAuth

export default function AccountLayout() {
  const { user, loading, fetchUserInfo } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      // Vérifie si les infos utilisateur sont disponibles et authentifiées
      if (user) {
        setIsAuthenticated(true); // L'utilisateur est authentifié
      } else {
        setIsAuthenticated(false); // L'utilisateur n'est pas authentifié
      }
    };
    
    checkAuthStatus();
  }, [user]); // Mettre à jour l'état chaque fois que `user` change

  if (loading) {
    return <Text>Loading...</Text>; // Afficher un loader pendant la récupération des données utilisateur
  }

  return (
    <View style={{ flex: 1 }}>
      <Stack>
        {/* Si l'utilisateur n'est pas authentifié, afficher la page d'authentification */}
        {!isAuthenticated ? (
          <Stack.Screen
            name="auth"
            options={{ headerShown: false }} // Pas d'en-tête pour la page auth
          />
        ) : (
          // Si l'utilisateur est authentifié, afficher la page premium
          <Stack.Screen
            name="premium"
            options={{ headerShown: false }} // Pas d'en-tête pour la page premium
          />
          
          
        )}
      </Stack>
    </View>
  );
}
