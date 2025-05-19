import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import StepDetails from '@/components/StepDetails';
import StepVerification from '@/components/StepVerification';
import StepSubtitles from '@/components/StepSubtitles';
import StepUpload from '@/components/StepUpload';
import StepOptions from '@/components/StepOptions';
import useEpisodeForm, { EpisodeFormData } from '@/hooks/useEpisodeForm';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useEpisodeSubmission } from '@/hooks/createEpisodeHandler';

const StepperScreen = () => {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const buttonSpacing = insets.bottom + 80;
  const { submitEpisode } = useEpisodeSubmission();
  const Id = Array.isArray(id) ? id[0] : id; // ✅ Force en string

  const buttonStyle = {
    marginBottom: buttonSpacing,
    marginTop: 10,
  };

  const { formData, updateField: setFormData ,updateVideoData } = useEpisodeForm();

  useEffect(() => {
    if (!Id) {
      router.back();
      return;
    }
  
  }, [Id]);
  

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
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
            <StepUpload formData={formData}  updateVideoData={updateVideoData}
            />
          </ScrollView>
        </ProgressStep>

        <ProgressStep label="Détails">
          <ScrollView contentContainerStyle={{ paddingBottom: buttonSpacing }}>
            <StepDetails formData={formData} setFormData={setFormData} />
          </ScrollView>
        </ProgressStep>

        <ProgressStep label="Options">
          <ScrollView contentContainerStyle={{ paddingBottom: buttonSpacing }}>
            <StepOptions formData={formData} setFormData={setFormData} />
          </ScrollView>
        </ProgressStep>

  
        <ProgressStep
  label="Vérification"
  onSubmit={async () => {
    try {
      console.log('🎯 FormData Final:', formData);
      await submitEpisode(Id, formData); // 🟢 Envoie les données
      router.replace('/home');    // ou redirection vers une page de succès
    } catch (error) {
      console.error('Erreur lors de la soumission :', error);
      // Tu peux afficher une alerte ou un toast ici
    }
  }}
>

          <ScrollView contentContainerStyle={{ paddingBottom: buttonSpacing }}>
            <StepVerification formData={formData} setFormData={setFormData}/>
          </ScrollView>
        </ProgressStep>
      </ProgressSteps>
    </View>
  );
};


export default StepperScreen;
