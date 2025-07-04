// components/PodcastDetail.tsx
import React from "react";
import { Alert, Button, ScrollView, View } from "react-native";
import { useAuth } from "@/hooks/useAuth";
import { usePodcastDetails } from "@/hooks/usePodcastDetails";
import { useEpisodes } from "@/hooks/useEpisods";
import { useSubscriberCount } from "@/hooks/useSubscriberCount";
import { PodcastHeader } from "@/components/PodcastHeader";
import { PodcastActions } from "@/components/PodcastActions";
import { EpisodeList } from "@/components/EpisodeList";
import { unknownPodcastImageUri } from "@/constants/images";
import { router } from "expo-router";

type Props = {
  podcastId: string;

};

export const PodcastDetail = ({ podcastId }: Props) => {
  const { user } = useAuth();
  const { podcast } = usePodcastDetails(podcastId);
  console.log("podcast id:", podcastId)

  const { episodes } = useEpisodes({ podcastId, favorites: false });
  const { count, isSubscribed, subscribe, unsubscribe, loading } = useSubscriberCount(Number(podcastId));
console.log("podcast details", podcast)

  const handleSubscribePress = () => {
    if (isSubscribed) {
      Alert.alert(
        "Confirmation",
        "Voulez-vous vraiment vous désabonner de ce podcast ?",
        [
          { text: "Annuler", style: "cancel" },
          {
            text: "Se désabonner",
            style: "destructive",
            onPress: unsubscribe,
          },
        ],
        { cancelable: true }
      );
    } else {
      subscribe();
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>

      <PodcastHeader
        coverImage={podcast?.imageFile}
        title={podcast?.title ?? ""}
        description={podcast?.description ?? ""}
        author={podcast?.author ?? ""}
        subscriberCount={count}
      />

      <PodcastActions
        isOwner={podcast?.userId === user?.id}
       onAddEpisode={() =>
            router.push(`/podcast/createEpisode?id=${podcastId}`)
        }
        onSubscribe={handleSubscribePress}
        subscribing={loading}
        isSubscribed={isSubscribed}
        subscriberCount={count}
      />

      <View style={{ paddingHorizontal: 20 }}>
        <EpisodeList data={episodes} />
      </View>
    </ScrollView>
  );
};
