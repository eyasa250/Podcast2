import StepDetails from '@/components/StepDetails';
import StepVerification from '@/components/StepVideoElements';
import StepVideoElements from '@/components/StepVideoElements';
import React from 'react';
import { View, Text } from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';

const StepperScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ProgressSteps
        activeStepIconBorderColor="#3498db"
        activeLabelColor="#3498db"
        completedProgressBarColor="#3498db"
        completedStepIconColor="#3498db"
        labelFontSize={12}
      >
         <ProgressStep label="Détails">
          <StepDetails />
        </ProgressStep>

        <ProgressStep label="Éléments vidéo">
          <StepVideoElements />
        </ProgressStep>

        <ProgressStep label="Vérification" onSubmit={() => console.log("Publié !")}>
          <StepVerification />
        </ProgressStep>
      </ProgressSteps>
    </View>
  );
};

export default StepperScreen;
