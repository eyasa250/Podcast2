import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function InitPodcastScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Let's Get Started!</Text>
      <Text style={styles.subtitle}>
        Start fresh by creating a new podcast or import one from another platform to continue your journey.
      </Text>

      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card}>
          <Ionicons name="mic" size={60} color="#4CAF50" />
          <Text style={styles.cardText}>Create New Podcast</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Ionicons name="folder-open" size={60} color="#4CAF50" />
          <Text style={styles.cardText}>Import Existing Podcast</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    color: '#555',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  card: {
    width: '45%',
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#F4F4F4',
    alignItems: 'center',
    elevation: 4,
  },
  cardText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
