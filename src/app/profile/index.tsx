import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/hooks/useAuth';
import { router } from 'expo-router';
import theme, { fontSize } from '@/core/theme';
import { PodcastGrid } from '@/components/PodcastGrid';
import { usePodcasts } from '@/hooks/usePodcasts';

const ProfileScreen = () => {
  const { signOut, user } = useAuth();
  const { podcasts, loading, error } = usePodcasts({ own: true });

  if (!user) return <Text style={styles.loading}>Chargement...</Text>;
  const dataWithAddNew = [...podcasts, { id: "add-new", isAddNew: true }];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
      {/* Header avec fond dégradé */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.settingsButton} onPress={() => router.push('/profile/settingScreen')}>
          <Text style={styles.settingsText}>Settings</Text>
        </TouchableOpacity>

        <Image source={{ uri: user.profilePic }} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.city}>{user.role}</Text>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statText}>70</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statText}>12,560</Text>
          </View>
        </View>
      </View>

      {/* Badges */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>your podcasts</Text>
        {/* <View style={styles.badgesContainer}>
          {[...Array(8)].map((_, i) => (
            <View key={i} style={styles.badge}>
              <Ionicons name="medal-outline" size={28} color="#555" />
            </View>
          ))}
        </View> */}
          <View style={styles.container}>
              {/* On supprime le FAB existant car on va l'intégrer dans la grille */}
              <PodcastGrid
                data={dataWithAddNew}
                onAddPress={() => router.push("/(tabs)/podcasts/create")}
              />
            </View>
      </View>

      {/* Liste d’éléments récents */}
      <View style={styles.section}>
        <ItemRow title="Crispy Calamari" date="24 July" time="10.00 AM" coins="12,560" />
        <ItemRow title="Teatro Cubano" date="26 July" time="12.00 PM" coins="10,560" />
      </View>

      {/* Bouton bas */}
      <TouchableOpacity style={styles.ctaButton}>
        {/* <Ionicons name="share-social-outline" size={20} color="#fff" /> */}
        <Text style={styles.ctaText}>pass to premium</Text>
      </TouchableOpacity>
      
      {/* Section Déconnexion */}
      <View style={styles.logoutSection}>
        <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
          <Ionicons name="log-out-outline" size={24} color="white" />
          <Text style={styles.logoutButtonText}>Se Déconnecter</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const ItemRow = ({ title, date, time, coins }: { title: string; date: string; time: string; coins: string }) => (
  <View style={styles.itemRow}>
    <View>
      <Text style={styles.itemTitle}>{title}</Text>
      <Text style={styles.itemMeta}>{date}   •   {time}</Text>
    </View>
    <View style={styles.itemRight}>
      <Text style={styles.itemCoins}>{coins}</Text>
      <Ionicons name="restaurant-outline" size={20} color="#888" />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  loading: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: fontSize.sm,
    color: '#888',
  },
  header: {
    backgroundColor: theme.colors.primary,
    paddingTop: 60,
    paddingBottom: 30,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: 'relative',
  },
  settingsButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: '#FF7A3E',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  settingsText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },
    logoutButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
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
  name: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
  },
  city: {
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
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  badge: {
    backgroundColor: '#F5F5F5',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemRow: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemMeta: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  itemRight: {
    alignItems: 'flex-end',
  },
  itemCoins: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFC107',
    marginBottom: 4,
  },
  ctaButton: {
    backgroundColor: '#E91E63',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 16,
    borderRadius: 30,
  },
  ctaText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
export default ProfileScreen;