import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';

const ProfileScreen = () => {
  const [isFollowing, setIsFollowing] = useState(false);

  const recentTracks = [
    { id: '1', name: 'Lost in the Fire', artist: 'Gesaffelstein & The Weeknd', cover: 'https://via.placeholder.com/100' },
    { id: '2', name: 'Blinding Lights', artist: 'The Weeknd', cover: 'https://via.placeholder.com/100' },
    { id: '3', name: 'After Hours', artist: 'The Weeknd', cover: 'https://via.placeholder.com/100' },
  ];

  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.profileImage} />
      <Text style={styles.username}>John Doe</Text>
      <Text style={styles.userBio}>Music lover | Playlist curator</Text>
      <TouchableOpacity style={styles.followButton} onPress={() => setIsFollowing(!isFollowing)}>
        <Text style={styles.followText}>{isFollowing ? 'Suivi' : 'Suivre'}</Text>
      </TouchableOpacity>
      <Text style={styles.sectionTitle}>Recently Played</Text>
      <FlatList
        data={recentTracks}
        keyExtractor={(item) => item.id}
        horizontal
        renderItem={({ item }) => (
          <View style={styles.trackItem}>
            <Image source={{ uri: item.cover }} style={styles.trackCover} />
            <Text style={styles.trackName}>{item.name}</Text>
            <Text style={styles.trackArtist}>{item.artist}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20, backgroundColor: '#121212' },
  profileImage: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  username: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  userBio: { color: 'gray', fontSize: 14, marginBottom: 10 },
  followButton: { backgroundColor: '#1DB954', paddingVertical: 8, paddingHorizontal: 20, borderRadius: 20, marginTop: 10 },
  followText: { color: 'white', fontWeight: 'bold' },
  sectionTitle: { color: 'white', fontSize: 18, marginVertical: 20, alignSelf: 'flex-start' },
  trackItem: { marginRight: 15, alignItems: 'center', width: 120 },
  trackCover: { width: 80, height: 80, borderRadius: 5 },
  trackName: { color: 'white', fontSize: 14, marginTop: 5, textAlign: 'center' },
  trackArtist: { color: 'gray', fontSize: 12, textAlign: 'center' },
});

export default ProfileScreen;
