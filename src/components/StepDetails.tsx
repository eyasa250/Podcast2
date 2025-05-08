import React from 'react';
import { View, Text, TextInput } from 'react-native';

const StepDetails = () => {
  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, marginBottom: 8 }}>Titre</Text>
      <TextInput
        placeholder="Nom de l'épisode"
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 6 }}
      />
      {/* autres champs */}
    </View>
  );
};

export default StepDetails;
