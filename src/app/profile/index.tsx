import React from 'react';
import { View, Text, Button, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assure-toi d'avoir installé la bibliothèque d'icônes
import { useAuth } from '@/hooks/useAuth';
import { router } from 'expo-router';

const ProfileScreen = () => {
  const { signOut, user } = useAuth();  // Accède aux données de l'utilisateur via useAuth

  if (!user) {
    return <Text>Chargement...</Text>;  // Affiche un message pendant que les données de l'utilisateur se chargent
  }

  return (
    <ScrollView style={styles.container}>
      {/* En-tête */}
      <View style={styles.header}>
        <Image
          source={{ uri: user.profilePic }}  // Affiche la photo de profil de l'utilisateur
          style={styles.profilePic}
        />
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.role}>
          {user.role === 'PODCASTER' ? 'Podcasteur Premium' : 'Auditeur'}
        </Text>
      </View>

      {/* Bio */}
      <Text style={styles.bio}>
        {user.bio || 'Aucune bio définie.'}
      </Text>

      {/* Section des abonnements ou podcasts selon le rôle */}
      {user.role === 'PODCASTER' ? (
        <>
          {/* Mes Podcasts */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Mes Podcasts</Text>
            <TouchableOpacity style={styles.button} onPress={() =>  router.push("/podcasts/videoUploader")}>
            <Ionicons name="add-circle-outline" size={24} color="white" />
              <Text style={styles.buttonText}>Ajouter un épisode</Text>
            </TouchableOpacity>
          </View>

          {/* Statistiques */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Statistiques</Text>
            <Text style={styles.stat}>Abonnés: 1,200</Text>
            <Text style={styles.stat}>Lectures: 10,000</Text>
          </View>
        </>
      ) : (
        <>
          {/* Mes Abonnements */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Mes Abonnements</Text>
            <Text style={styles.stat}>Podcast 1 - Titre</Text>
            <Text style={styles.stat}>Podcast 2 - Titre</Text>
          </View>
        </>
      )}

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: '#4CAF50', // Bordure verte pour attirer l'attention sur l'image de profil
  },
  username: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
  },
  role: {
    fontSize: 16,
    color: '#888',
  },
  bio: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#555',
    marginBottom: 20,
  },
  section: {
    marginBottom: 25,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  stat: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
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
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default ProfileScreen;
