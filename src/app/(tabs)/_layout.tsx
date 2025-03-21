import React, { useCallback } from "react"
import { TouchableOpacity, Text } from "react-native"
import { createDrawerNavigator, DrawerContentComponentProps } from "@react-navigation/drawer"
import { FontAwesome6, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons"
import { SplashScreen, Tabs } from "expo-router"
import CustomSidebar from "@/components/CustomSidebar"
import { FloatingPlayerProvider } from "@/hooks/FloatingPlayerContext"
import { FloatingPlayer } from "@/components/FloatingPlayer"
import { useSetupTrackPlayer } from "@/hooks/useSetupTrackPlayer"
import { useLogTrackPlayerState } from "@/hooks/useLogTrackPlayerState"
import { colors, fontSize } from "@/core/theme"
import ProfileScreen from "./profile"

SplashScreen.preventAutoHideAsync()

const Drawer = createDrawerNavigator()

// Avatar qui ouvre le drawer
const AvatarButton = ({ navigation }: { navigation: any }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.openDrawer()} // Ouvre le drawer au clic
      style={{
        marginLeft: 15,
        backgroundColor: "#1db954", // Couleur de fond
        width: 50,
        height: 50,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>S</Text> 
    </TouchableOpacity>
  )
}

// Navigation des Tabs avec Avatar dans Home
const TabsNavigation = ({ navigation }: { navigation: any }) => {
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
            headerShown: true, // Afficher le header
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
            },
          }}
        >
          <Tabs.Screen
            name="home"
            options={{
              title: "Home",
              tabBarIcon: ({ color }) => <FontAwesome6 name="house" size={20} color={color} />,
              headerLeft: () => <AvatarButton navigation={navigation} />, // Avatar en haut à droite
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
  )
}

// Root Navigation avec Drawer (Sans NavigationContainer)
const RootNavigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props: DrawerContentComponentProps) => <CustomSidebar {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: "white",
          width: 280,
          borderTopLeftRadius: 20, // Coins arrondis en haut à gauche
          borderTopRightRadius: 20, // Coins arrondis en haut à droite
          borderTopWidth: 20,
          borderBottomWidth:20 ,// Pas de bordure en haut

        },
        drawerActiveTintColor: "#000", // Texte noir pour l'élément actif
        drawerInactiveTintColor: "#888", // Texte gris pour les inactifs
 
        drawerLabelStyle: { color: colors.primary },
      }} initialRouteName="channel"
      defaultStatus="closed" 
    >
      {/* Intégration des Tabs dans le Drawer */}
      <Drawer.Screen name="channel" component={TabsNavigation} />
      <Drawer.Screen name="profile" component={ProfileScreen} />

    </Drawer.Navigator>
  )
}

export default RootNavigation
