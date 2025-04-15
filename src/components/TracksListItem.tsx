import React from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight } from 'react-native';
import { Card } from 'react-native-paper';
import { Track, useActiveTrack } from 'react-native-track-player';

export type TracksListItemProps = {
  track: Track;
  onTrackSelect: (track: Track) => void;
};

export const TracksListItem = ({
  track,
  onTrackSelect: handleTrackSelect,
}: TracksListItemProps) => {
  const isActiveTrack = useActiveTrack()?.url === track.url;

  return (
    <TouchableHighlight
      onPress={() => handleTrackSelect(track)} // When tapped, selects the track
      underlayColor="#ddd" // Light grey effect when tapped
      style={styles.touchable} // Optional: Add extra styling if needed
    >
      <Card style={[styles.card
/*         , isActiveTrack && styles.activeCard
 */        ]}>
        <Card.Cover source={{ uri: track.artwork /* || 'https://via.placeholder.com/150'  */}} style={styles.image} />
        <Card.Content>
          <Text style={styles.title}>{track.title}</Text>
          <Text style={styles.artist}>{track.artist || 'Unknown Artist'}</Text>
        </Card.Content>
      </Card>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  touchable: {
    borderRadius: 10, // Ensures highlight effect follows card shape
  },
  card: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
  },
  activeCard: {
    borderColor: '#1DB954', // Green border when active
    borderWidth: 2,
  },
  image: {
    height: 150,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  artist: {
    fontSize: 14,
    color: 'gray',
  },
});
