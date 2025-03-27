import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://192.168.1.19:3001"; // Assure-toi que l'IP correspond bien à ton backend

// Fonction de connexion
export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password });
  return response.data;
};

// Fonction d'inscription
export const register = async (name: string, email: string, password: string, confirmPassword: string, role: string) => {
  const response = await axios.post(`${API_URL}/auth/register`, {
    name,
    email,
    password,
    confirmPassword,
    role,
  });
  return response.data;
};

// Fonction pour récupérer les infos utilisateur
export const getUserInfo = async () => {
  const token = await AsyncStorage.getItem("auth_token");

  if (!token) throw new Error("Aucun token trouvé");

  const response = await axios.get(`${API_URL}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};
