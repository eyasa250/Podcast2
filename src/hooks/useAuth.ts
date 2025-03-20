import { useState } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login, register } from "@/services/authApi";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Connexion
  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const { access_token } = await login(email, password);
      console.log("Réponse de l'API:", access_token);

      await AsyncStorage.setItem("auth_token", access_token);
      const token = await AsyncStorage.getItem("auth_token");
      console.log("Token stocké :", token);
      router.replace("/(tabs)/home");
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  // Inscription
  const signUp = async (name: string, email: string, password: string, confirmPassword: string, role: string) => {
    setLoading(true);
    setError(null);
    try {
      await register(name, email, password, confirmPassword, role);
      alert("Inscription réussie !");
      router.push("/auth/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur d'inscription");
    } finally {
      setLoading(false);
    }
  };

  return { signIn, signUp, loading, error };
};
