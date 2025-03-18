import { colors, fontSize } from "@/constants/tokens"
import { SplashScreen, Tabs } from "expo-router"
import { StyleSheet } from "react-native"
import { FontAwesome6, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons"
import { useCallback } from "react"
import { useSetupTrackPlayer } from "@/hooks/useSetupTrackPlayer"
import { useLogTrackPlayerState } from "@/hooks/useLogTrackPlayerState"
import { FloatingPlayer } from "@/components/FloatingPlayer"
import { FloatingPlayerProvider } from "@/hooks/FloatingPlayerContext"

SplashScreen.preventAutoHideAsync()

const TabsNavigation = () => {
  useLogTrackPlayerState()

  const handleTrackPlayerLoaded = useCallback(() => {
    SplashScreen.hideAsync()
  }, [])

  useSetupTrackPlayer({ onLoad: handleTrackPlayerLoaded })

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
            headerShown: false,
            tabBarStyle: {
              position: "absolute",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              borderTopWidth: 0,
              paddingTop: 8,
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
            name="playlists"
            options={{
              title: "Playlists",
              tabBarIcon: ({ color }) => <MaterialCommunityIcons name="playlist-play" size={28} color={color} />,
            }}
          />

          <Tabs.Screen
            name="premium"
            options={{
              title: "Premium",
              tabBarIcon: ({ color }) => <FontAwesome6 name="crown" size={20} color={color} />,
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
      </>
    </FloatingPlayerProvider>
  )
}

export default TabsNavigation
