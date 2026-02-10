
import React, { useState } from "react";
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Platform, ActivityIndicator } from "react-native";
import { useTheme } from "@react-navigation/native";
import { colors } from "@/styles/commonStyles";
import { usePi } from "@/contexts/PiContext";
import { IconSymbol } from "@/components/IconSymbol";
import { LinearGradient } from 'expo-linear-gradient';

export default function ProfileScreen() {
  console.log('ProfileScreen: Rendering profile screen');
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
            <ActivityIndicator size="large" color="#DC2626" />
            <Text style={styles.loadingText}>Loading Pi SDK...</Text>
          </View>
        )}

        {/* Not Authenticated */}
        {!loading && !authenticated && (
          <View style={styles.loginSection}>
            <View style={styles.loginCardWrapper}>
              <LinearGradient
                colors={['#DC2626', '#B91C1C', '#991B1B']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.loginCardGradient}
              >
                <View style={styles.iconCircleWrapper}>
                  <View style={styles.iconCircle}>
                    <IconSymbol 
                      ios_icon_name="person.circle.fill" 
                      android_material_icon_name="account-circle" 
                      size={72} 
                      color="#DC2626" 
                    />
                  </View>
                </View>
                
                <Text style={styles.loginTitle}>Join Albania Hub</Text>
                <Text style={styles.loginSubtitle}>Connect with Pi Network to unlock your profile and access exclusive community features</Text>
                
                {!piSDKLoaded && (
                  <View style={styles.warningCard}>
                    <IconSymbol 
                      ios_icon_name="exclamationmark.triangle.fill" 
                      android_material_icon_name="warning" 
                      size={20} 
                      color="#F59E0B" 
                    />
                    <Text style={styles.warningText}>Pi SDK not available. Please open in Pi Browser.</Text>
                  </View>
                )}

                <TouchableOpacity 
                  style={[styles.loginButton, (!piSDKLoaded || isProcessing) && styles.buttonDisabled]}
                  onPress={handleLogin}
                  disabled={!piSDKLoaded || isProcessing}
                  activeOpacity={0.9}
                >
                  {isLoggingIn ? (
                    <ActivityIndicator color="#DC2626" />
                  ) : (
                    <View style={styles.loginButtonContent}>
                      <IconSymbol 
                        ios_icon_name="lock.shield.fill" 
                        android_material_icon_name="verified-user" 
                        size={20} 
                        color="#DC2626" 
                      />
                      <Text style={styles.loginButtonText}>Login with Pi Network</Text>
                    </View>
                  )}
                </TouchableOpacity>

                <View style={styles.benefitsContainer}>
                  <View style={styles.benefitItem}>
                    <IconSymbol 
                      ios_icon_name="checkmark.circle.fill" 
                      android_material_icon_name="check-circle" 
                      size={16} 
                      color="#FFFFFF" 
                    />
                    <Text style={styles.benefitText}>Secure authentication</Text>
                  </View>
                  <View style={styles.benefitItem}>
                    <IconSymbol 
                      ios_icon_name="checkmark.circle.fill" 
                      android_material_icon_name="check-circle" 
                      size={16} 
                      color="#FFFFFF" 
                    />
                    <Text style={styles.benefitText}>Personalized experience</Text>
                  </View>
                  <View style={styles.benefitItem}>
                    <IconSymbol 
                      ios_icon_name="checkmark.circle.fill" 
                      android_material_icon_name="check-circle" 
                      size={16} 
                      color="#FFFFFF" 
                    />
                    <Text style={styles.benefitText}>Community access</Text>
                  </View>
                </View>
              </LinearGradient>
            </View>
          </View>
        )}

        {/* Authenticated */}
        {!loading && authenticated && piUser && (
          <View style={styles.profileSection}>
            <View style={styles.profileCardWrapper}>
              <LinearGradient
                colors={['#059669', '#047857']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.profileCardGradient}
              >
                <View style={styles.avatarCircleWrapper}>
                  <View style={styles.avatarCircle}>
                    <IconSymbol 
                      ios_icon_name="person.circle.fill" 
                      android_material_icon_name="account-circle" 
                      size={80} 
                      color="#059669" 
                    />
                  </View>
                </View>
                <Text style={styles.username}>{piUser.username}</Text>
                <Text style={styles.userId}>ID: {piUser.uid}</Text>
                
                <View style={styles.verifiedBadge}>
                  <IconSymbol 
                    ios_icon_name="checkmark.seal.fill" 
                    android_material_icon_name="verified" 
                    size={18} 
                    color="#FFFFFF" 
                  />
                  <Text style={styles.verifiedText}>Verified Pi User</Text>
                </View>
              </LinearGradient>
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
                    ios_icon_name="arrow.right.square.fill" 
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
    paddingTop: Platform.OS === 'android' ? 48 : 60,
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
    paddingVertical: 20,
  },
  loginCardWrapper: {
    borderRadius: 24,
    overflow: 'hidden',
    boxShadow: '0px 8px 24px rgba(220, 38, 38, 0.2)',
    elevation: 8,
  },
  loginCardGradient: {
    padding: 32,
    alignItems: 'center',
  },
  iconCircleWrapper: {
    marginBottom: 24,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.15)',
    elevation: 4,
  },
  loginTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  loginSubtitle: {
    fontSize: 15,
    color: '#FEE2E2',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  warningCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(254, 243, 199, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 24,
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  warningText: {
    fontSize: 13,
    color: '#FEF3C7',
    marginLeft: 10,
    flex: 1,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
    marginBottom: 24,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
    elevation: 4,
  },
  loginButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  loginButtonText: {
    color: '#DC2626',
    fontSize: 17,
    fontWeight: '700',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  benefitsContainer: {
    width: '100%',
    gap: 12,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  benefitText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  profileSection: {
    paddingVertical: 20,
  },
  profileCardWrapper: {
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 24,
    boxShadow: '0px 8px 24px rgba(5, 150, 105, 0.2)',
    elevation: 8,
  },
  profileCardGradient: {
    padding: 32,
    alignItems: 'center',
  },
  avatarCircleWrapper: {
    marginBottom: 20,
  },
  avatarCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.15)',
    elevation: 4,
  },
  username: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  userId: {
    fontSize: 14,
    color: '#D1FAE5',
    marginBottom: 16,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  verifiedText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: '#DC2626',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
    boxShadow: '0px 2px 8px rgba(220, 38, 38, 0.1)',
    elevation: 2,
  },
  logoutButtonText: {
    color: '#DC2626',
    fontSize: 17,
    fontWeight: '700',
    marginLeft: 10,
  },
});
