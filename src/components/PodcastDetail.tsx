import React from "react";
import { Alert, View, FlatList } from "react-native";
import { useAuth } from "@/hooks/useAuth";
import { useSubscriberCount } from "@/hooks/useSubscriberCount";
import { PodcastHeader } from "@/components/PodcastHeader";
import { PodcastActions } from "@/components/PodcastActions";
import { EpisodeCard } from "@/components/EpisodeCard";
import { router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { Episode } from "@/types";
import { selectEpisode } from "@/store/slices/episodeSlice";

export const PodcastDetail = () => {
  const { user } = useAuth();

  const { selected: podcast, selectedId } = useSelector(
    (state: RootState) => state.podcasts
  );
 const dispatch = useDispatch();
  const episodes = useSelector((state: RootState) => state.episodes.byPodcast);

  const {
    count,
    isSubscribed,
    subscribe,
    unsubscribe,
    loading,
  } = useSubscriberCount(Number(selectedId));

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

  const handleTrackSelect = (episode: Episode) => {
    dispatch(selectEpisode(episode));
    router.push({
      pathname: '/player',
      // params: {
      //   id: episode.id,
      //   title: episode.title,
      //   description: episode.description,
      //   podcast: episode.podcast.title,
      //   podcastId: episode.podcastId,
      //   artwork: episode.coverImageUrl,
      //   videoUrl: episode.videoUrl!,
      //   transcriptionUrls: JSON.stringify(episode.transcriptionUrls),
      // },
    });
  };

  if (!podcast) return null;

  return (
    <FlatList
      data={episodes}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={
        <>
          <PodcastHeader
            coverImage={podcast.imageFile}
            title={podcast.title}
            description={podcast.description}
            author={podcast.author ?? ""}
            subscriberCount={count}
          />
          <PodcastActions
            isOwner={podcast.userId === user?.id}
            onAddEpisode={() =>
              router.push(`/podcast/createEpisode?id=${selectedId}`)
            }
            onSubscribe={handleSubscribePress}
            subscribing={loading}
            isSubscribed={isSubscribed}
            subscriberCount={count}
          />
        </>
      }
      renderItem={({ item }) => (
        <View style={{ marginBottom: 8, paddingHorizontal: 16 }}>
          <EpisodeCard
            episode={item}
            onPress={() => handleTrackSelect(item)}
          />
        </View>
      )}
      contentContainerStyle={{ paddingBottom: 80 }}
    />
  );
};
