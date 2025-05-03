import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/core/theme';
import { useAuth } from '@/hooks/useAuth';

const ProfileScreen = () => {
  const [isFollowing, setIsFollowing] = useState(false);

  const recentTracks = [
    { id: '1', name: 'Lost in the Fire', artist: 'Gesaffelstein & The Weeknd', cover: 'https://via.placeholder.com/100' },
    { id: '2', name: 'Blinding Lights', artist: 'The Weeknd', cover: 'https://via.placeholder.com/100' },
    { id: '3', name: 'After Hours', artist: 'The Weeknd', cover: 'https://via.placeholder.com/100' },
  ];
  const { signOut, user } = useAuth();

  return (
    <LinearGradient colors={[colors.primary, '#191414']} style={styles.gradient}>
      <View style={styles.container}>
        <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.profileImage} />

        <Text style={styles.username}>John Doe</Text>   
        <Text style={styles.userBio}>🎵 Music lover | Playlist curator</Text>
        <View>
      <Text>Bienvenue {user?.name}</Text>
      <Button title="Se déconnecter" onPress={signOut} />
    </View>
        <TouchableOpacity
          style={[styles.followButton, { backgroundColor: isFollowing ? '#fff' : '#1DB954' }]}
          onPress={() => setIsFollowing(!isFollowing)}
        >
          <Text style={[styles.followText, { color: isFollowing ? '#1DB954' : 'white' }]}>
            {isFollowing ? 'Suivi' : 'Suivre'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>🎧 Recently Played</Text>
        <FlatList
          data={recentTracks}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.trackItem}>
              <Image source={{ uri: item.cover }} style={styles.trackCover} />
              <Text style={styles.trackName}>{item.name}</Text>
              <Text style={styles.trackArtist}>{item.artist}</Text>
            </View>
          )}
        />

         <Text style={styles.sectionTitle}>🎧 favorites</Text>
        <FlatList
          data={recentTracks}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.trackItem}>
              <Image source={{ uri: item.cover }} style={styles.trackCover} />
              <Text style={styles.trackName}>{item.name}</Text>
              <Text style={styles.trackArtist}>{item.artist}</Text>
            </View>
          )}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { 
    flex: 1, 
    alignItems: 'center', 
    padding: 20, 
    backgroundColor: 'transparent' 
  },
  profileImage: {
    width: 120, 
    height: 120, 
    borderRadius: 60, 
    borderWidth: 3, 
    borderColor: 'white',
    marginBottom: 10
  },
  username: { 
    color: 'white', 
    fontSize: 22, 
    fontWeight: 'bold' 
  },
  userBio: { 
    color: 'white', 
    fontSize: 14, 
    marginBottom: 15,
    textAlign: 'center'
  },
  followButton: { 
    paddingVertical: 10, 
    paddingHorizontal: 30, 
    borderRadius: 20, 
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  followText: { 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  sectionTitle: { 
    color: 'white', 
    fontSize: 18, 
    marginVertical: 20, 
    alignSelf: 'flex-start', 
    fontWeight: 'bold'
  },
  trackItem: { 
    marginRight: 15, 
    alignItems: 'center', 
    width: 120
  },
  trackCover: { 
    width: 100, 
    height: 100, 
    borderRadius: 10
  },
  trackName: { 
    color: 'white', 
    fontSize: 14, 
    marginTop: 5, 
    textAlign: 'center',
    fontWeight: 'bold'
  },
  trackArtist: { 
    color: '#ddd', 
    fontSize: 12, 
    textAlign: 'center'
  },
});

export default ProfileScreen;

/*  import PodcasterProfile from '@/components/PodcasterProfile';
import AuditorProfile from '@/components/AuditorProfile';

import { useAuth } from "@/hooks/useAuth";
import React from "react";

const ProfileScreen = () => {
  const { user } = useAuth();

  if (!user) return null;

  switch (user.role) {
    case 'podcaster':
      return <PodcasterProfile user={user} />;
    case 'auditor':
    default:
      return <AuditorProfile user={user} />;
  }
};
export default ProfileScreen;  */
