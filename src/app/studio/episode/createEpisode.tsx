import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import StepDetails from '@/components/StepDetails';
import StepVerification from '@/components/StepVerification';
import StepUpload from '@/components/StepUpload';
import StepOptions from '@/components/StepOptions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { uploadEpisode } from '@/services/episodeApi';
import { useEpisodeForm } from '@/hooks/useEpisodeForm';
import { EpisodeFormData } from '@/types';
import { ActivityIndicator, Text } from 'react-native';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { addEpisode, fetchEpisodesByPodcast } from '@/store/slices/episodeSlice';


const StepperScreen = () => {
const { formData, updateField} = useEpisodeForm();
const dispatch = useAppDispatch();

  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const buttonSpacing = insets.bottom + 80;
  const Id = Array.isArray(id) ? id[0] : id; // ✅ Force en string
 const buttonStyle = {
    marginBottom: buttonSpacing,
    marginTop: 10,
  };

const [isSubmitting, setIsSubmitting] = useState(false);


  useEffect(() => {
    if (!Id) {
      router.back();
      return;
    }
  
  }, [Id]);
  
const buildFormDataFromEpisode = (episodeData: EpisodeFormData): FormData => {
  const formData = new FormData();

  formData.append('title', episodeData.title);
  formData.append('description', episodeData.description);
  formData.append('trackType', episodeData.trackType);
  formData.append('audience', episodeData.audience);

  episodeData.tags
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0)
    .forEach(tag => formData.append('tags[]', tag));
//console.log("episode media file", episodeData.mediaFile);
if (!episodeData.mediaFile) {
  throw new Error("Aucun fichier média sélectionné.");
}

// ✅ Utilise le bon champ selon le type de fichier
const mediaFieldName = episodeData.trackType === 'AUDIO' ? 'audio' : 'video';
//console.log("media file name:",mediaFieldName)
formData.append(mediaFieldName, {
  uri: episodeData.mediaFile.uri,
  name: episodeData.mediaFile.name,
  type: episodeData.mediaFile.mimeType || (episodeData.trackType === 'AUDIO' ? 'audio/mpeg' : 'video/mp4'),
} as any);


if (episodeData.imageFile) {
  formData.append('cover', {
    uri: episodeData.imageFile.uri,
    name: episodeData.imageFile.name,
    type: episodeData.imageFile.mimeType || 'image/jpeg',
  } as any);
}


  return formData;
};


  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {isSubmitting && (
  <View style={{ position: 'absolute', top: '50%', left: '50%', marginLeft: -20, marginTop: -20, zIndex: 10 }}>
    <ActivityIndicator size="large" color="#3498db" />
  </View>
)}

      <ProgressSteps
      activeStepIconBorderColor="#3498db"
      activeLabelColor="#3498db"
      {...{
        nextBtnStyle: buttonStyle,
        previousBtnStyle: buttonStyle,
        submitBtnStyle: buttonStyle,
      }}
      >
        <ProgressStep label="Upload">
          <ScrollView contentContainerStyle={{ paddingBottom: buttonSpacing }}>
          <StepUpload
                formData={formData}
                setMediaFile={(data) => updateField('mediaFile', data)}
              />
          </ScrollView>
        </ProgressStep>

        <ProgressStep label="Détails">
          <ScrollView contentContainerStyle={{ paddingBottom: buttonSpacing }}>
            <StepDetails formData={formData} setFormData={updateField} />
          </ScrollView>
        </ProgressStep>

        <ProgressStep label="Options">
          <ScrollView contentContainerStyle={{ paddingBottom: buttonSpacing }}>
            <StepOptions formData={formData} setFormData={updateField} />
          </ScrollView>
        </ProgressStep>

  
        <ProgressStep
                label="Vérification"
               onSubmit={async () => {
  try {
    setIsSubmitting(true);
    const builtFormData = buildFormDataFromEpisode(formData);

    const resultAction = await dispatch(addEpisode({ podcastId: Id, formData: builtFormData }));
await dispatch(fetchEpisodesByPodcast(Id));

    if (addEpisode.fulfilled.match(resultAction)) {
      console.log('✅ Épisode ajouté via Redux:', resultAction.payload);
      router.back(); // ou router.replace(...) si tu veux rediriger ailleurs
    } else {
      console.error('❌ Erreur Redux:', resultAction.payload || resultAction.error);
    }

  } catch (error) {
    console.error('❌ Erreur générale:', error);
  } finally {
    setIsSubmitting(false);
  }
}}



        >

          <ScrollView contentContainerStyle={{ paddingBottom: buttonSpacing }}>
            <StepVerification formData={formData} setFormData={updateField}/>
          </ScrollView>
        </ProgressStep>
      </ProgressSteps>
    </View>
  );
};


export default StepperScreen;