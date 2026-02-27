
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { WidgetProvider } from "@/contexts/WidgetContext";
import { PiProvider } from "@/contexts/PiContext";
import { SystemBars } from "react-native-edge-to-edge";
import { Stack } from "expo-router";
import "react-native-reanimated";
import { useColorScheme } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import {
  DarkTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { colors } from "@/styles/commonStyles";
import ErrorBoundary from "@/components/ErrorBoundary";

SplashScreen.preventAutoHideAsync();

function RootLayoutContent() {
  console.log('RootLayout: Initializing Albania Hub');
  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      console.log('RootLayout: Fonts loaded, hiding splash screen');
      SplashScreen.hideAsync().catch((err) => {
        console.error('RootLayout: Error hiding splash screen:', err);
      });
    }
  }, [loaded]);

  useEffect(() => {
    if (error) {
      console.error('RootLayout: Font loading error:', error);
      SplashScreen.hideAsync().catch((err) => {
        console.error('RootLayout: Error hiding splash screen:', err);
      });
    }
  }, [error]);

  if (!loaded && !error) {
    return null;
  }

  // Custom dark theme for Albania Hub - Anthracite & Gold
  const AlbaniaHubTheme: Theme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: colors.purple,
      background: colors.background,
      card: colors.card,
      text: colors.text,
      border: colors.border,
      notification: colors.gold,
    },
  };

  console.log('RootLayout: Rendering main app structure with dark theme');

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={AlbaniaHubTheme}>
        <WidgetProvider>
          <PiProvider>
            <SystemBars style="light" />
            <StatusBar style="light" />
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: colors.background },
              }}
            >
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen 
                name="modal" 
                options={{ 
                  presentation: 'modal',
                  contentStyle: { backgroundColor: colors.background }
                }} 
              />
              <Stack.Screen 
                name="formsheet" 
                options={{ 
                  presentation: 'formSheet',
                  contentStyle: { backgroundColor: colors.background }
                }} 
              />
              <Stack.Screen 
                name="transparent-modal" 
                options={{ 
                  presentation: 'transparentModal',
                  contentStyle: { backgroundColor: 'transparent' }
                }} 
              />
              <Stack.Screen 
                name="+not-found" 
                options={{ 
                  title: 'Oops!',
                  contentStyle: { backgroundColor: colors.background }
                }} 
              />
            </Stack>
          </PiProvider>
        </WidgetProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <RootLayoutContent />
    </ErrorBoundary>
  );
}
