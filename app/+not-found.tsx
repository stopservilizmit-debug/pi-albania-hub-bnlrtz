
import { Link, Stack } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import React from 'react';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <IconSymbol 
          ios_icon_name="exclamationmark.triangle.fill" 
          android_material_icon_name="error" 
          size={80} 
          color={colors.gold} 
        />
        <Text style={styles.title}>Page Not Found</Text>
        <Text style={styles.subtitle}>This screen doesn't exist.</Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    marginTop: 20,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 24,
    textAlign: 'center',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: colors.purple,
    borderRadius: 12,
  },
  linkText: {
    fontSize: 16,
    color: colors.white,
    fontWeight: '600',
  },
});
