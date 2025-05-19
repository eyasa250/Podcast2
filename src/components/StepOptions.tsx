import { EpisodeFormData } from '@/hooks/useEpisodeForm';
import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { View, Text, TextInput, StyleSheet, Switch } from 'react-native';

const StepOptions = ({
  formData,
  setFormData,
}: {
  formData: EpisodeFormData;
  setFormData: (field: keyof EpisodeFormData, value: any) => void;
}) => {
  return (
    <View style={styles.container}>
      {/* Tags */}
      <TextInput
        value={formData.tags}
        onChangeText={(text) => setFormData('tags', text)}
        placeholder="ex: musique, humour, podcast"
        style={styles.input}
      />
      <Picker
  selectedValue={formData.audience}
  onValueChange={(value) => setFormData('audience', value)}>
  <Picker.Item label="Général" value="GENERAL" />
  <Picker.Item label="Adulte" value="MATURE" />
  <Picker.Item label="Enfants" value="KIDS" />
</Picker>
  

   {/* Toggle Sous-titres */}
   <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
    <Text>Subtitles</Text>
    <Switch
      value={formData.subtitlesEnabled}
      onValueChange={(value) => setFormData('subtitlesEnabled', value)}
    />
  </View>

  {/* Toggle Amélioration du son */}
  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
    <Text>Sound Enhancement</Text>
    <Switch
      value={formData.soundEnhancementEnabled}
      onValueChange={(value) => setFormData('soundEnhancementEnabled', value)}
    />
  </View>
    </View>
  );
};


const styles = StyleSheet.create({
container: { padding: 24, backgroundColor: '#fff', flex: 1 },
title: { fontWeight: '600', fontSize: 18, color: '#444' },
text: { marginTop: 10, color: '#666', fontSize: 14 },
label: { fontSize: 16, color: '#444', marginTop: 20, fontWeight: '500' },
input: {
  backgroundColor: '#f9f9f9',
  color: '#222',
  padding: 14,
  borderRadius: 12,
  fontSize: 16,
  borderWidth: 1,
  borderColor: '#ddd',
  marginTop: 6,
},
toggleContainer: {
  marginTop: 20,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},
});


export default StepOptions;
