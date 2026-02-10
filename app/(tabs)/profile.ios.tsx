
import React, { useState } from "react";
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useTheme } from "@react-navigation/native";
import { colors } from "@/styles/commonStyles";
import { usePi } from "@/contexts/PiContext";
import { IconSymbol } from "@/components/IconSymbol";

export default function ProfileScreen() {
  console.log('ProfileScreen: Rendering profile screen (iOS)');
  const theme = useTheme();
  const { authenticated, piUser, loading, signInWithPi, signOut, piSDKLoaded } = usePi();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogin = async () => {
    console.log('ProfileScreen: User tapped login button');
    setIsLoggingIn(true);
    try {
      await signInWithPi();
    } catch (error) {
      console.error('ProfileScreen: Login error:', error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    console.log('ProfileScreen: User tapped logout button');
    setIsLoggingOut(true);
    try {
      signOut();
    } finally {
      setIsLoggingOut(false);
    }
  };

  const isProcessing = isLoggingIn || isLoggingOut;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
        </View>

        {/* Loading State */}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Loading Pi SDK...</Text>
          </View>
        )}

        {/* Not Authenticated */}
        {!loading && !authenticated && (
          <View style={styles.loginSection}>
            <View style={styles.iconContainer}>
              <IconSymbol 
                ios_icon_name="person.circle" 
                android_material_icon_name="account-circle" 
                size={80} 
                color={colors.textSecondary} 
              />
            </View>
            <Text style={styles.loginTitle}>Not Logged In</Text>
            <Text style={styles.loginSubtitle}>Login with Pi to access your profile and full features</Text>
            
            {!piSDKLoaded && (
              <View style={styles.warningCard}>
                <IconSymbol 
                  ios_icon_name="exclamationmark.triangle" 
                  android_material_icon_name="warning" 
                  size={24} 
                  color="#F59E0B" 
                />
                <Text style={styles.warningText}>Pi SDK not available. Please open this app in Pi Browser.</Text>
              </View>
            )}

            <TouchableOpacity 
              style={[styles.loginButton, (!piSDKLoaded || isProcessing) && styles.buttonDisabled]}
              onPress={handleLogin}
              disabled={!piSDKLoaded || isProcessing}
              activeOpacity={0.8}
            >
              {isLoggingIn ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.loginButtonText}>Login with Pi</Text>
              )}
            </TouchableOpacity>
          </View>
        )}

        {/* Authenticated */}
        {!loading && authenticated && piUser && (
          <View style={styles.profileSection}>
            <View style={styles.profileCard}>
              <View style={styles.avatarContainer}>
                <IconSymbol 
                  ios_icon_name="person.circle.fill" 
                  android_material_icon_name="account-circle" 
                  size={80} 
                  color={colors.primary} 
                />
              </View>
              <Text style={styles.username}>{piUser.username}</Text>
              <Text style={styles.userId}>ID: {piUser.uid}</Text>
            </View>

            <View style={styles.infoCard}>
              <View style={styles.infoRow}>
                <IconSymbol 
                  ios_icon_name="checkmark.circle.fill" 
                  android_material_icon_name="check-circle" 
                  size={24} 
                  color="#059669" 
                />
                <Text style={styles.infoText}>Authenticated with Pi Network</Text>
              </View>
            </View>

            <TouchableOpacity 
              style={[styles.logoutButton, isProcessing && styles.buttonDisabled]}
              onPress={handleLogout}
              disabled={isProcessing}
              activeOpacity={0.8}
            >
              {isLoggingOut ? (
                <ActivityIndicator color="#DC2626" />
              ) : (
                <>
                  <IconSymbol 
                    ios_icon_name="arrow.right.square" 
                    android_material_icon_name="logout" 
                    size={20} 
                    color="#DC2626" 
                  />
                  <Text style={styles.logoutButtonText}>Logout</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 16,
  },
  loginSection: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  iconContainer: {
    marginBottom: 24,
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
  },
  loginSubtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  warningCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 24,
    width: '100%',
  },
  warningText: {
    fontSize: 14,
    color: '#92400E',
    marginLeft: 10,
    flex: 1,
  },
  loginButton: {
    backgroundColor: '#DC2626',
    paddingHorizontal: 48,
    paddingVertical: 14,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  profileSection: {
    paddingVertical: 20,
  },
  profileCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  username: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  userId: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  infoCard: {
    backgroundColor: '#D1FAE5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#065F46',
    marginLeft: 10,
  },
  logoutButton: {
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: '#DC2626',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  logoutButtonText: {
    color: '#DC2626',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
});
