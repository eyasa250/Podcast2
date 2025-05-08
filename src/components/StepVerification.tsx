import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StepVerification = ({ formData }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Résumé</Text>
      <Text>Titre : {formData.title}</Text>
      <Text>Description : {formData.description}</Text>
      <Text>Playlist : {formData.playlist}</Text>
      <Text>Audience : {formData.audience}</Text>
      <Text>Tags : {formData.tags}</Text>
      <Text>Langue : {formData.language}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontWeight: 'bold', fontSize: 18, marginBottom: 8 },
});

export default StepVerification;
