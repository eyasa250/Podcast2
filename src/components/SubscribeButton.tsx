import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { getSubscriptionCount, isSubscribedToPodcast, unsubscribeFromPodcast, subscribeToPodcast } from "@/services/subscriptionApi";

const SubscribeButton = ({ podcastId }: { podcastId: number }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [count, setCount] = useState(0);

  const fetchData = async () => {
    try {
      const [countRes, statusRes] = await Promise.all([
        getSubscriptionCount(podcastId),
        isSubscribedToPodcast(podcastId),
      ]);

      setCount(countRes.data.count);
      setIsSubscribed(statusRes.data.isSubscribed);
    } catch (err) {
      console.error("Erreur lors de la récupération des données :", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleToggleSubscribe = async () => {
    try {
      if (isSubscribed) {
        await unsubscribeFromPodcast(podcastId);
        setIsSubscribed(false);
        setCount((prev) => prev - 1);
      } else {
        await subscribeToPodcast(podcastId);
        setIsSubscribed(true);
        setCount((prev) => prev + 1);
      }
    } catch (err) {
      console.error("Erreur lors de l'abonnement/désabonnement :", err);
    }
  };

  return (
    <TouchableOpacity onPress={handleToggleSubscribe} style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
      <Feather
        name={isSubscribed ? "user-check" : "user-plus"}
        size={24}
        color={isSubscribed ? "green" : "gray"}
      />
      <Text>{count}</Text>
    </TouchableOpacity>
  );
};

export default SubscribeButton;
