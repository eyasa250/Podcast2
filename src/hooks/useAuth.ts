import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login, register, getUserInfo } from "@/services/authApi";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null); // Stocke les infos utilisateur
  const router = useRouter();

  // Connexion
  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const { access_token } = await login(email, password);
      await AsyncStorage.setItem("auth_token", access_token);
      await fetchUserInfo(); // Récupérer les infos de l'utilisateur après connexion
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

  // Récupérer les infos de l'utilisateur
  const fetchUserInfo = async () => {
    setLoading(true);
    try {
      const data = await getUserInfo();
      setUser(data);
      console.log(data);
    } catch (err: any) {
      console.error("Erreur lors de la récupération des infos utilisateur:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // Charger les infos utilisateur au montage
  useEffect(() => {
    fetchUserInfo();
  }, []);

  return { signIn, signUp, user, fetchUserInfo, loading, error };
};
