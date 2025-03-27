import React, { useCallback } from "react";
import { createDrawerNavigator, DrawerContentComponentProps } from "@react-navigation/drawer";
import { FontAwesome6, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { SplashScreen, Tabs } from "expo-router";
import CustomSidebar from "@/components/CustomSidebar";
import { FloatingPlayerProvider } from "@/hooks/FloatingPlayerContext";
import { FloatingPlayer } from "@/components/FloatingPlayer";
import { useSetupTrackPlayer } from "@/hooks/useSetupTrackPlayer";
import { useLogTrackPlayerState } from "@/hooks/useLogTrackPlayerState";
import { colors, fontSize } from "@/core/theme";
import ProfileScreen from "../profile";
import AvatarButton from "@/components/AvatarButton"; // ✅ Import de AvatarButton
import RecentlyPlayedScreen from "@/components/RecentlyPlayedScreen";

SplashScreen.preventAutoHideAsync();

const Drawer = createDrawerNavigator();

// 📌 Navigation des Tabs avec Avatar dans le header
const TabsNavigation = () => {
  useLogTrackPlayerState();

  const handleTrackPlayerLoaded = useCallback(() => {
    SplashScreen.hideAsync();
  }, []);

  useSetupTrackPlayer({ onLoad: handleTrackPlayerLoaded });

  return (
    <FloatingPlayerProvider>
      <>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: colors.primary,
            tabBarLabelStyle: {
              fontSize: fontSize.xs,
              fontWeight: "500",
            },
            headerShown: true, // ✅ Affiche le header
            headerStyle: {
              backgroundColor: "white",
            },
            headerTintColor: "white",
            tabBarStyle: {
              position: "absolute",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              borderTopWidth: 0,
              paddingTop: 8,
              paddingBottom: 10,
              height: 60,
            },
          }}
        >
          <Tabs.Screen
            name="home"
            options={{
              title: "Home",
              tabBarIcon: ({ color }) => <FontAwesome6 name="house" size={20} color={color} />,
              headerLeft: () => <AvatarButton />, // ✅ Avatar affiché en haut à gauche
            }}
          />
          <Tabs.Screen
            name="search"
            options={{
              title: "Search",
              tabBarIcon: ({ color }) => <Ionicons name="search" size={24} color={color} />,
              headerLeft: () => <AvatarButton />, // ✅ Avatar affiché en haut à gauche

            }}
          />
          <Tabs.Screen
            name="playlists"
            options={{
              title: "Playlists",
              tabBarIcon: ({ color }) => <MaterialCommunityIcons name="playlist-play" size={28} color={color} />,
              headerLeft: () => <AvatarButton />, // ✅ Avatar affiché en haut à gauche

            }}
          />
          <Tabs.Screen
            name="premium"
            options={{
              title: "Premium",
              tabBarIcon: ({ color }) => <FontAwesome6 name="crown" size={20} color={color} />,
              headerLeft: () => <AvatarButton />, // ✅ Avatar affiché en haut à gauche

            }}
          />
        </Tabs>

        {/* Floating Player */}
        <FloatingPlayer
          style={{
            position: "absolute",
            left: 8,
            right: 8,
            bottom: 78,
          }}
        />
      </>
    </FloatingPlayerProvider>
  );
};

// 📌 Root Navigation avec Drawer
const RootNavigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props: DrawerContentComponentProps) => <CustomSidebar {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: "white",
          width: 280,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
        drawerActiveTintColor: "#000",
        drawerInactiveTintColor: "#888",
        drawerLabelStyle: { color: colors.primary },
      }}
      initialRouteName="home"
      defaultStatus="closed"
    >
      {/* Accueil */}
      <Drawer.Screen name="home" component={TabsNavigation} options={{ title: "Home" }} />

      {/* Profil */}
      <Drawer.Screen name="profile" component={ProfileScreen} options={{ title: "Profile" }} />

      {/* Recently Played */}
      <Drawer.Screen name="recentlyPlayed" component={RecentlyPlayedScreen} options={{ title: "Recently Played" }} />

      {/* Settings and Privacy */}
      <Drawer.Screen name="settings" component={ProfileScreen} options={{ title: "Settings and Privacy" }} />
    </Drawer.Navigator>
  );
};

export default RootNavigation;
