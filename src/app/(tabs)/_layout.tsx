import React, { useEffect, useState, useCallback } from "react";
import { FontAwesome6, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { SplashScreen, Tabs } from "expo-router";
import { FloatingPlayerProvider } from "@/hooks/FloatingPlayerContext";
import { FloatingPlayer } from "@/components/FloatingPlayer";
import { useSetupTrackPlayer } from "@/hooks/useSetupTrackPlayer";
import { useLogTrackPlayerState } from "@/hooks/useLogTrackPlayerState";
import { colors, fontSize } from "@/core/theme";
import { useAuth } from "@/hooks/useAuth";

SplashScreen.preventAutoHideAsync();

const TabsNavigation = () => {
  const { user } = useAuth();

  useLogTrackPlayerState();

  const handleTrackPlayerLoaded = useCallback(() => {
    SplashScreen.hideAsync();
  }, []);

  useSetupTrackPlayer({ onLoad: handleTrackPlayerLoaded });



  return (
    <FloatingPlayerProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          tabBarLabelStyle: {
            fontSize: fontSize.xs,
            fontWeight: "500",
          },
          headerShown: true,
          headerStyle: {
            backgroundColor: "white",
          },
          headerTintColor: "white",
    //    headerLeft: renderAvatar, // ✅ Ajout global basé sur auth
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
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            tabBarIcon: ({ color }) => <Ionicons name="search" size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="library"
          options={{
            title: "library",
            tabBarIcon: ({ color }) => <FontAwesome6 name="bookmark" size={28} color={color} />,
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            title: "Account",
            tabBarIcon: ({ color }) => <FontAwesome6 name="crown" size={20} color={color} />
 }}
        />
      </Tabs>

      <FloatingPlayer
        style={{
          position: "absolute",
          left: 8,
          right: 8,
          bottom: 78,
        }}
      />
    </FloatingPlayerProvider>
  );
};

export default TabsNavigation;
