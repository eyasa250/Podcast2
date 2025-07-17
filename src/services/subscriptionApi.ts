import api from "lib/axios";
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
  return api.post(`/subscriptions/subscribe/${podcastId}`,  headers);
};

// ✅ Se désabonner d'un podcast
export const unsubscribeFromPodcast = async (podcastId: number) => {
  const headers = await getAuthHeaders();
  return api.delete(`/subscriptions/unsubscribe/${podcastId}`, headers);
};

// ✅ Obtenir les abonnements de l'utilisateur connecté
export const getMySubscriptions = async () => {
  const headers = await getAuthHeaders();
  return api.get(`/subscriptions/mine`, headers);
};

// ✅ Obtenir le nombre d'abonnés pour un podcast (pas besoin de token ici normalement)
export const getSubscriptionCount = async (podcastId: number) => {
  return api.get(`/subscriptions/count/${podcastId}`);
};
// ✅ Vérifie si l'utilisateur est abonné à un podcast
export const isSubscribedToPodcast = async (podcastId: number) => {
  const headers = await getAuthHeaders();
  return api.get(`/subscriptions/is-subscribed/${podcastId}`, headers);
};
