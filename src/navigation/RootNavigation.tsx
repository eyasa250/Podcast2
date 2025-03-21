
import React from 'react';
import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Stack } from 'expo-router';
import HomeScreen from '@/app';
import ProfileScreen from '@/app/(tabs)/profile';
import CustomSidebar from '@/components/CustomSidebar';

// Import des écrans et du composant custom


const Drawer = createDrawerNavigator();

const RootNavigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props: DrawerContentComponentProps) => <CustomSidebar {...props} />}
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            backgroundColor: '#121212',
            width: 280,
          },
          drawerLabelStyle: { color: 'white' },
        }}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen
          name="StackScreens"
          component={StackScreens}
          options={{ drawerLabel: 'Other Screens' }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const StackScreens: React.FC = () => (
  <Stack>
    <Stack.Screen
      name="(tabs)"
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="player"
      options={{
        presentation: 'card',
        gestureEnabled: true,
        gestureDirection: 'vertical',
        animationDuration: 400,
        headerShown: false,
      }}
    />
  </Stack>
);

export default RootNavigation;
