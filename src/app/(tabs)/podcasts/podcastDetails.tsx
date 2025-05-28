import React from "react";
import { Alert, ScrollView, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import { usePodcastDetails } from "@/hooks/usePodcastDetails";
import { useEpisodes } from "@/hooks/useEpisods";
import { useSubscriberCount } from "@/hooks/useSubscriberCount";
import { PodcastHeader } from "@/components/PodcastHeader";
import { PodcastActions } from "@/components/PodcastActions";
import { EpisodeList } from "@/components/EpisodeList";

export default function PodcastDetailScreen() {
  const { id, title, description, author } = useLocalSearchParams();
  const Id = Array.isArray(id) ? id[0] : id;
  const router = useRouter();
  const { user } = useAuth();
  const { podcast } = usePodcastDetails(Id);
  const { episodes } = useEpisodes({ podcastId: Id });

  const { count, isSubscribed, subscribe, unsubscribe, loading } = useSubscriberCount(Number(Id));
  const handleSubscribePress = () => {
    if (isSubscribed) {
      Alert.alert(
        "Confirmation",
        "Voulez-vous vraiment vous désabonner de ce podcast ?",
        [
          { text: "Annuler", style: "cancel" },
          { text: "Se désabonner", style: "destructive", onPress: unsubscribe },
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
        coverImage={podcast?.coverImage}
        title={title}
        description={description}
        author={author}
        subscriberCount={count}
      />

      <PodcastActions
        isOwner={podcast?.userId === user?.id}
        onAddEpisode={() => router.push(`/(tabs)/podcasts/stepper?id=${id}`)}
        onSubscribe={handleSubscribePress}  // <-- ici on passe la nouvelle fonction
        subscribing={loading}
        isSubscribed={isSubscribed}
        subscriberCount={count}
      />

      <View style={{ paddingHorizontal: 20 }}>
        <EpisodeList data={episodes} />
      </View>
    </ScrollView>
  );
}
