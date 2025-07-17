import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { EpisodeList } from '@/components/EpisodeList';
import { useView } from '@/hooks/useView';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';

import { colors } from '@/core/theme';
import { Episode } from '@/types';
import { fetchFavoriteEpisodes } from '@/store/slices/episodeSlice';

const EpisodeListScreen = () => {

  const { type } = useLocalSearchParams();
  const dispatch = useAppDispatch();

  const { history } = useView();
const favorites = useAppSelector((state) => state.episodes.favorites);

  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(false);

  const title =
    type === 'favorites'
      ? 'My Favorites'
      : type === 'history'
      ? 'Recently Viewed'
      : 'Podcast Episodes';

  // 👇 Cette variable contiendra les bons épisodes selon le type
  const episodesToDisplay =
    type === 'favorites'
      ? favorites
      : type === 'history'
      ? episodes
      : [];

useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      if (type === 'history') {
        const hist = await history();
        setEpisodes(hist);
      } else if (type === 'favorites') {
        await dispatch(fetchFavoriteEpisodes());
      }
    } catch (error) {
      console.error("Erreur de chargement :", error);
    }
    setLoading(false);
  };

  fetchData();
}, [type, dispatch]);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Text
        style={{
          fontSize: 22,
          fontWeight: 'bold',
          paddingHorizontal: 16,
          paddingVertical: 10,
          color: colors.text,
        }}
      >
        {title}
      </Text>

      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
      ) : episodesToDisplay.length === 0 ? ( // ✅ on teste la bonne liste
        <Text style={{ padding: 20, textAlign: 'center', color: colors.text }}>
          No episodes found.
        </Text>
      ) : (
        <EpisodeList data={episodesToDisplay} />
      )}
    </View>
  );
};

export default EpisodeListScreen;
