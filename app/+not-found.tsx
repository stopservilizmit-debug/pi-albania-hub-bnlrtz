
import { Link, Stack } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import React from 'react';

export default function NotFoundScreen() {
  console.log('NotFoundScreen: User navigated to non-existent route');
  
  return (
    <>
      <Stack.Screen 
        options={{ 
          title: 'Page Not Found',
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
        }} 
      />
      <View style={styles.container}>
        <IconSymbol 
          ios_icon_name="exclamationmark.triangle.fill" 
          android_material_icon_name="error" 
          size={80} 
          color={colors.gold} 
        />
        <Text style={styles.title}>404 - Page Not Found</Text>
        <Text style={styles.description}>
          The page you&apos;re looking for doesn&apos;t exist.
        </Text>
        <Link href="/(tabs)/(home)/" style={styles.link}>
          <View style={styles.linkButton}>
            <IconSymbol 
              ios_icon_name="house.fill" 
              android_material_icon_name="home" 
              size={20} 
              color={colors.white} 
            />
            <Text style={styles.linkText}>Go to Home</Text>
          </View>
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
    color: colors.text,
    marginTop: 20,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  link: {
    marginTop: 15,
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.purple,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 8,
  },
  linkText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
});
