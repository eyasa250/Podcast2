import React, { useEffect } from "react";
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
import { fetchFavoriteEpisodes, selectEpisode } from "@/store/slices/episodeSlice";
import { setEditPodcast } from "@/store/slices/editPodcastSlice";
import { useAppDispatch } from "@/hooks/reduxHooks";

export const PodcastDetail = () => {
  const { user } = useAuth();

  const { selected: podcast, selectedId } = useSelector(
    (state: RootState) => state.podcasts
  );
const dispatch = useAppDispatch(); // ✅
  const episodes = useSelector((state: RootState) => state.episodes.byPodcast);
useEffect(() => {
  dispatch(fetchFavoriteEpisodes());
}, []);
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
const handleEditPodcast = () => {
  dispatch(setEditPodcast({ mode: "edit", podcastId: selectedId }));
  router.push("/podcast/PodcastFormScreen");
};

  const handleTrackSelect = (episode: Episode) => {
    dispatch(selectEpisode(episode));
    router.push({
      pathname: '/player',
    
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
            onEditPodcast={handleEditPodcast} // ✅ nouveau
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
