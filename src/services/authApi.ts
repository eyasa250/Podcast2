// services/authApi.ts

import api from "lib/axios";

// 🔐 Fonction de connexion
export const login = async (email: string, password: string) => {
  try {
   
    const response = await api.post("/auth/login", { email, password });

    return response.data;
  } catch (error: any) {
    console.error("❌ Erreur lors du login :", error?.response?.data || error.message);
    throw error; // important pour que Redux puisse capturer l’erreur
  }
};

// 📝 Fonction d'inscription
export const register = async (
  name: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  const response = await api.post("/auth/signup", {
    name,
    email,
    password,
    confirmPassword,
  });
  return response.data;
};

// 👤 Récupérer les infos de l'utilisateur connecté
export const getUserInfo = async () => {
  const response = await api.get("/users/me");
  return response.data;
};

// 🔁 Changer le rôle vers PODCASTER
export const upgradeToPodcaster = async () => {
  const response = await api.patch("/users/upgrade-to-podcaster");
  return response.data;
};
