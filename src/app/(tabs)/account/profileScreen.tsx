import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import { PodcastGrid } from "@/components/PodcastGrid";
import { EpisodeList } from "@/components/EpisodeList";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { signOut } from "@/store/slices/authSlice";
import { fetchSubscriptions, setSelectedPodcastId,fetchMyPodcasts } from "@/store/slices/podcastSlice";
import { fetchFavoriteEpisodes } from "@/store/slices/episodeSlice";
import { useView } from "@/hooks/useView";
import PremiumCard from "@/components/PremiumCard";
import ChatBubble from "@/components/ChatBubble";
import theme, { fontSize } from "@/core/theme";
import { router } from "expo-router";

const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const { subscriptions } = useAppSelector((state) => state.podcasts);
    const { mine } = useAppSelector((state) => state.podcasts);

  const favorites = useAppSelector((state) => state.episodes.favorites);
  const { history } = useView();

  const [historyEpisodes, setHistoryEpisodes] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  useEffect(() => {
    dispatch(fetchMyPodcasts());
    dispatch(fetchSubscriptions());
    dispatch(fetchFavoriteEpisodes());

    const loadHistory = async () => {
      setLoadingHistory(true);
      const data = await history();
      setHistoryEpisodes(data);
      setLoadingHistory(false);
    };
    loadHistory();
  }, []);

  if (!user) return <Text style={styles.loading}>Chargement...</Text>;

  const dataWithAddNew = [...mine, { id: "add-new", isAddNew: true }];

  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
        {/* Header utilisateur */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.settingsButton} onPress={() => dispatch(signOut())}>
            <Ionicons name="log-out-outline" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.role}>{user.role}</Text>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statText}>70</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statText}>12,560</Text>
            </View>
          </View>
        </View>

        {/* Section : Mes podcasts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Podcasts</Text>
         <PodcastGrid data={dataWithAddNew}  onAddPress={() =>  router.push("/podcast/PodcastFormScreen")
         }
 />
        </View>
 
        {/* Section : Mes abonnements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My following</Text>
         {subscriptions?(<PodcastGrid data={subscriptions} />)
         :(
           <MaterialIcons name="podcasts" size={50} color="#555" />

         )}
          
        </View>

        {/* Section : Mes favoris */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Liked episodes</Text>
          <EpisodeList data={favorites} />
        </View>

        {/* Section : Historique */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Historique</Text>
          {loadingHistory ? (
            <ActivityIndicator size="large" />
          ) : (
            <EpisodeList data={historyEpisodes} />
          )}
        </View>

        {user.role !== "PODCASTER" && <PremiumCard />}
      </ScrollView>

      {user.role === "PODCASTER" && <ChatBubble />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  loading: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: fontSize.sm,
    color: '#888',
  },
  header: {
    backgroundColor: theme.colors.primary,
    paddingTop: 25,
    paddingBottom: 25,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  settingsButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  name: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
  },
  role: {
    color: '#e0e0e0',
    marginBottom: 10,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 10,
  },
  statBox: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: 'center',
    gap: 8,
  },
  statText: {
    fontWeight: 'bold',
    color: '#333',
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
});

export default ProfileScreen;
