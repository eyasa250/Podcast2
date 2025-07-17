import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login, register, getUserInfo, upgradeToPodcaster } from "@/services/authApi";

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
  const signUp = async (name: string, email: string, password: string, confirmPassword: string) => {
    setLoading(true);
    setError(null);
    try {
      await register(name, email, password, confirmPassword);
      alert("Inscription réussie !");
      router.push("/auth/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur d'inscription");
    } finally {
      setLoading(false);
    }
  };
  const signOut = async () => {
    setLoading(true);
    try {
      await AsyncStorage.removeItem("auth_token");
      setUser(null); // ou undefined selon ton useState
      router.replace("/(tabs)/home"); // ou autre route selon ton app
    } catch (err) {
      console.error("Erreur lors de la déconnexion :", err);
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
      await AsyncStorage.setItem("user", JSON.stringify(data)); // 👈 Sauvegarde tout l'objet utilisateur
    } catch (err: any) {
    //  console.error("Erreur lors de la récupération des infos utilisateur:", err.message);
    } finally {
      setLoading(false);
    }
  };
  const upgradeRole = async () => {
  setLoading(true);
  try {
    const result = await upgradeToPodcaster();
    console.log("Rôle mis à jour:", result);
    await fetchUserInfo(); // 🔁 recharge les infos utilisateur
    alert("Votre rôle a été mis à jour en podcaster !");
  } catch (err: any) {
    setError(err.response?.data?.message || "Erreur lors du changement de rôle");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("auth_token");
      if (token) {
        await fetchUserInfo();
      }
    };
    checkAuth();
  }, []);
  

  return { signIn, signUp, user, fetchUserInfo, loading, error ,signOut,upgradeRole };
};
