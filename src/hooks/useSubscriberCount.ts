import { useEffect, useState } from "react";
import { getSubscriptionCount, subscribeToPodcast, isSubscribedToPodcast, unsubscribeFromPodcast } from "@/services/subscriptionApi";

export function useSubscriberCount(podcastId?: number) {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const refresh = async () => {
    if (!podcastId) return;
    try {
      const [countRes, statusRes] = await Promise.all([
        getSubscriptionCount(podcastId),
        isSubscribedToPodcast(podcastId),
      ]);
      setCount(countRes.data.count);
      setIsSubscribed(statusRes.data.isSubscribed);
    } catch (e) {
      console.error("Erreur chargement abonnés:", e);
    }
  };

  const subscribe = async () => {
    if (!podcastId) return;
    setLoading(true);
    try {
      await subscribeToPodcast(podcastId);
      await refresh();
    } catch (e) {
      console.error("Erreur lors de l'abonnement :", e);
    } finally {
      setLoading(false);
    }
  };

  const unsubscribe = async () => {
    if (!podcastId) return;
    setLoading(true);
    try {
      await unsubscribeFromPodcast(podcastId);
      await refresh();
    } catch (e) {
      console.error("Erreur lors du désabonnement :", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, [podcastId]);

  return { count, isSubscribed, subscribe, unsubscribe, loading };
}

