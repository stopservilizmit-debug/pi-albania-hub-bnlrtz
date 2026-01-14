
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useNetworkState } from "expo-network";
import { WidgetProvider } from "@/contexts/WidgetContext";
import { PiProvider } from "@/contexts/PiContext";
import { SystemBars } from "react-native-edge-to-edge";
import { Stack, router } from "expo-router";
import "react-native-reanimated";
import { useColorScheme, Alert } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  // Custom light theme for Pi Albania Hub
  const LightTheme: Theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#7C3AED',
      background: '#FFFFFF',
      card: '#FFFFFF',
      text: '#111827',
      border: '#E5E7EB',
      notification: '#EC4899',
    },
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={LightTheme}>
        <WidgetProvider>
          <PiProvider>
            <SystemBars style="dark" />
            <StatusBar style="dark" />
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
          </PiProvider>
        </WidgetProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
