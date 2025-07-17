// lib/axios.ts
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from 'expo-constants';

// const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;


const API_BASE_URL = Constants.expoConfig?.extra?.apiUrl ?? "http://localhost:3001";


const api = axios.create({
  baseURL: API_BASE_URL,
});

// Injecter le token dans chaque requête
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
