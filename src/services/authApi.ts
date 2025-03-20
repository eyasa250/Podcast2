import axios from "axios";

const API_URL = "http://192.168.1.24:3001/auth"; // Remplace par ton IP locale ou domaine

// Fonction de connexion
export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, 
    { email, password });
  return response.data;
};

// Fonction d'inscription
export const register = async (name: string, email: string, password: string, confirmPassword: string, role: string) => {
  const response = await axios.post(`${API_URL}/register`, {
    name,
    email,
    password,
    confirmPassword,
    role,
  });
  return response.data;
};
