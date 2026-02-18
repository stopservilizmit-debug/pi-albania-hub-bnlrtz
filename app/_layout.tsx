
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { WidgetProvider } from "@/contexts/WidgetContext";
import { PiProvider } from "@/contexts/PiContext";
import { SystemBars } from "react-native-edge-to-edge";
import { Stack } from "expo-router";
import "react-native-reanimated";
import { useColorScheme, View, Text } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { colors } from "@/styles/commonStyles";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  console.log('RootLayout: Initializing app');
  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      console.log('RootLayout: Fonts loaded, hiding splash screen');
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    if (error) {
      console.error('RootLayout: Font loading error:', error);
      // Hide splash screen even if fonts fail to load
      SplashScreen.hideAsync();
    }
  }, [error]);

  // Show a simple loading view while fonts are loading
  if (!loaded && !error) {
    return null;
  }

  // Custom dark theme with anthracite background and deep red accents
  const AnthraciteTheme: Theme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: colors.crimson,
      background: colors.anthracite,
      card: colors.card,
      text: colors.text,
      border: colors.border,
      notification: colors.crimson,
    },
  };

  console.log('RootLayout: Rendering main app structure');

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={AnthraciteTheme}>
        <WidgetProvider>
          <PiProvider>
            <SystemBars style="light" />
            <StatusBar style="light" />
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
              <Stack.Screen name="formsheet" options={{ presentation: 'formSheet' }} />
              <Stack.Screen name="transparent-modal" options={{ presentation: 'transparentModal' }} />
            </Stack>
          </PiProvider>
        </WidgetProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
