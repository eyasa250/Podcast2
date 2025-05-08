// app/podcasts/stepper.tsx
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { View } from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import StepDetails from '@/components/StepDetails';
import StepVerification from '@/components/StepVerification';
import StepOptions from '@/components/stepOptions';
import StepSubtitles from '@/components/StepSubtitles';
import StepUpload from '@/components/StepUpload';
import useEpisodeForm from '@/hooks/useEpisodeForm';

const StepperScreen = () => {

  const { formData, updateField: setFormData } = useEpisodeForm();

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ProgressSteps activeStepIconBorderColor="#3498db" activeLabelColor="#3498db">
      <ProgressStep label="upload">
          <StepUpload formData={formData} setFormData={setFormData} />
        </ProgressStep>
        <ProgressStep label="Détails">
          <StepDetails formData={formData} setFormData={setFormData} />
        </ProgressStep>

        <ProgressStep label="Options">
          <StepOptions formData={formData} setFormData={setFormData} />
        </ProgressStep>

        <ProgressStep label="Sous-titres">
          <StepSubtitles formData={formData} setFormData={setFormData} />
        </ProgressStep>

        <ProgressStep label="Vérification" onSubmit={() => console.log('Soumis', formData)}>
          <StepVerification formData={formData} />
        </ProgressStep>
      </ProgressSteps>
    </View>
  );
};

export default StepperScreen;
