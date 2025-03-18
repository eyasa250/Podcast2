import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{flex:1}}>  
          <RootNavigation />
      <StatusBar style="auto" /></GestureHandlerRootView>
  
    </SafeAreaProvider>
  );
}

const RootNavigation = () => {
  return (  // Ajout du return ici
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="player" options={{ 
        presentation:'card',
        gestureEnabled:true,
        gestureDirection:'vertical',
        animationDuration:400,
        headerShown:false

      }} />

    </Stack>
  );
};
