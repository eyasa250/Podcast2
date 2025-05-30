// hooks/useFavorites.ts
import { useState } from "react";

import { getMySubscriptions, getSubscriptionCount, subscribeToPodcast, unsubscribeFromPodcast } from "@/services/subscriptionApi";

export const useSubscription = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const SubscriptionCount = async (podcastId: number) => {
    try {
      setLoading(true);
      const data = await getSubscriptionCount(podcastId);
      return data;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addSubscription = async (podcastId: number) => {
    try {
      setLoading(true);
      await subscribeToPodcast(podcastId);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const removeSubscription = async (podcastId: number) => {
    try {
      setLoading(true);
      await unsubscribeFromPodcast(podcastId);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const MySubscriptions = async () => {
    try {
      setLoading(true);
      const data = await getMySubscriptions();
      return data;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    SubscriptionCount,
    addSubscription,
    removeSubscription,
    MySubscriptions,
  };
};
