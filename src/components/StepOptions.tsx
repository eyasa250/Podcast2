import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const StepOptions = ({ formData, setFormData }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tags</Text>
      <TextInput
        placeholder="ex: musique, humour, podcast"
        value={formData.tags}
        onChangeText={(text) => setFormData({ ...formData, tags: text })}
        style={styles.input}
      />

      <Text style={styles.label}>Langue</Text>
      <TextInput
        placeholder="fr, en, etc."
        value={formData.language}
        onChangeText={(text) => setFormData({ ...formData, language: text })}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  label: { fontWeight: 'bold', marginTop: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 6,
    marginTop: 4,
  },
});

export default StepOptions;
