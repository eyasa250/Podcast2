import axios from "lib/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Fonction utilitaire : récupérer le token depuis AsyncStorage
const getAuthHeaders = async () => {
  const token = await AsyncStorage.getItem("auth_token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// ✅ S'abonner à un podcast
export const subscribeToPodcast = async (podcastId: number) => {
  const headers = await getAuthHeaders();
  return axios.post(`/subscriptions/subscribe/${podcastId}`,  headers);
};

// ✅ Se désabonner d'un podcast
export const unsubscribeFromPodcast = async (podcastId: number) => {
  const headers = await getAuthHeaders();
  return axios.delete(`/subscriptions/unsubscribe/${podcastId}`, headers);
};

// ✅ Obtenir les abonnements de l'utilisateur connecté
export const getMySubscriptions = async () => {
  const headers = await getAuthHeaders();
  return axios.get(`/subscriptions/mine`, headers);
};

// ✅ Obtenir le nombre d'abonnés pour un podcast (pas besoin de token ici normalement)
export const getSubscriptionCount = async (podcastId: number) => {
  return axios.get(`/subscriptions/count/${podcastId}`);
};
// ✅ Vérifie si l'utilisateur est abonné à un podcast
export const isSubscribedToPodcast = async (podcastId: number) => {
  const headers = await getAuthHeaders();
  return axios.get(`/subscriptions/is-subscribed/${podcastId}`, headers);
};
