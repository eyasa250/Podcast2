import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

const StepSubtitles = () => {
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(true);
  const [soundEnhancementEnabled, setSoundEnhancementEnabled] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sous-titres</Text>
      <Text style={styles.text}>
        Les sous-titres seront générés automatiquement avec Whisper après l'envoi.
      </Text>

      {/* Toggle Sous-titres */}
      <View style={styles.toggleContainer}>
        <Text style={styles.label}>Sous-titres automatiques</Text>
        <Switch
          value={subtitlesEnabled}
          onValueChange={setSubtitlesEnabled}
        />
      </View>

      {/* Toggle Amélioration du son */}
      <View style={styles.toggleContainer}>
        <Text style={styles.label}>Amélioration du son</Text>
        <Switch
          value={soundEnhancementEnabled}
          onValueChange={setSoundEnhancementEnabled}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontWeight: 'bold', fontSize: 18 },
  text: { marginTop: 10, color: '#555' },
  toggleContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
});

export default StepSubtitles;
