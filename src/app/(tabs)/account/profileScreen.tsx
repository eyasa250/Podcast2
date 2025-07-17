import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { PodcastGrid } from "@/components/PodcastGrid";
import { usePodcasts } from "@/hooks/usePodcasts";
import ProfileOptionList from "@/components/ProfileOptionList";
import PremiumCard from "@/components/PremiumCard";
import ChatBubble from "@/components/ChatBubble";
import theme, { fontSize } from "@/core/theme";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { signOut } from "@/store/slices/authSlice";

const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { podcasts } = usePodcasts({ own: true });

  if (!user) return <Text style={styles.loading}>Chargement...</Text>;

  const dataWithAddNew = [...podcasts, { id: "add-new", isAddNew: true }];

  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
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

        <ProfileOptionList />
        {user.role !== "PODCASTER" && <PremiumCard />}
      </ScrollView>

      {user.role === "PODCASTER" && <ChatBubble />}
    </>
  )
;
};
const styles = StyleSheet.create({
  container: {
    flex: 2,
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
  logoutSection: {
    marginTop: 30,
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#FF5722',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
  name: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
  },
    settingsButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
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
