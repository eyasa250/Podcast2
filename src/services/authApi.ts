import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://192.168.1.20:3001"; // Assure-toi que l'IP correspond bien à ton backend

// Fonction de connexion
export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password });
  console.log('Réponse complète après login:', response.data);  // Logue toute la réponse
 // console.log('Token reçu après login:', response.data.access_token); // Logue le token

  return response.data;
};


// Fonction d'inscription
export const register = async (name: string, email: string, password: string, confirmPassword: string) => {
  const response = await axios.post(`${API_URL}/auth/signup`, {
    name,
    email,
    password,
    confirmPassword,
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
// Fonction pour changer le rôle de l'utilisateur vers "PODCASTER"
export const upgradeToPodcaster = async () => {
  const token = await AsyncStorage.getItem("auth_token");

  if (!token) throw new Error("Aucun token trouvé");

  const response = await axios.patch(`${API_URL}/users/upgrade-to-podcaster`, null, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

