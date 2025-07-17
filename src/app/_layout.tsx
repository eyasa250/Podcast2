import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Provider } from "react-redux";
import { store } from "@/store";

export default function AppLayout() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack screenOptions={{ headerShown: false }} />
          <StatusBar style="auto" />
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </Provider>
  );
}
