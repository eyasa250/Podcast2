import { EpisodeFormData } from '@/hooks/useEpisodeForm';
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Video from 'react-native-video';

const StepVerification = ({
  formData,
  setFormData,
}: {
  formData: EpisodeFormData;
  setFormData: (field: keyof EpisodeFormData, value: any) => void;
}) => {
  const coverUri =
    typeof formData.coverImage === 'string'
      ? formData.coverImage
      : formData.coverImage?.uri;

  const videoUri =
    typeof formData.videoData === 'string'
      ? formData.videoData
      : formData.videoData?.uri;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Title: {formData.title}</Text>
      <Text>Description: {formData.description}</Text>
      <Text>Audience: {formData.audience}</Text>
      <Text>Tags: {formData.tags}</Text>

      {coverUri && (
        <>
          <Text style={styles.sectionTitle}>Cover Preview:</Text>
          <Image source={{ uri: coverUri }} style={styles.image} />
        </>
      )}

      {videoUri && (
        <>
          <Text style={styles.sectionTitle}>Video Preview:</Text>
          <Video
            source={{ uri: videoUri }}
            style={styles.video}
            controls
            resizeMode="contain"
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontWeight: 'bold', fontSize: 18, marginBottom: 8 },
  sectionTitle: { marginTop: 16, fontWeight: 'bold' },
  image: { width: '100%', height: 200, marginTop: 8, borderRadius: 8 },
  video: { width: '100%', height: 250, marginTop: 8, borderRadius: 8 },
});

export default StepVerification;
