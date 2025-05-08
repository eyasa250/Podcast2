import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StepSubtitles = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sous-titres</Text>
      <Text style={styles.text}>
        Les sous-titres seront générés automatiquement avec Whisper après l'envoi.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontWeight: 'bold', fontSize: 18 },
  text: { marginTop: 10, color: '#555' },
});

export default StepSubtitles;
