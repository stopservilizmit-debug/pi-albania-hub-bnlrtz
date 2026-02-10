
import { useTheme } from "@react-navigation/native";
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from "@/styles/commonStyles";
import { usePi } from "@/contexts/PiContext";
import { IconSymbol } from "@/components/IconSymbol";

export default function ProfileScreen() {
  const { piUser, authenticated, loading, signInWithPi, signOut } = usePi();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const theme = useTheme();

  const handleLogin = async () => {
    console.log('User tapped Login with Pi button');
    try {
      await signInWithPi();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = async () => {
    console.log('User tapped Logout button');
    setIsLoggingOut(true);
    try {
      await signOut();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const loadingText = 'Connecting...';
  const loginText = 'Login with Pi';
  const buttonText = loading ? loadingText : loginText;

  const loggingOutText = 'Logging out...';
  const logoutText = 'Logout';
  const logoutButtonText = isLoggingOut ? loggingOutText : logoutText;

  const piUserName = piUser?.username || 'Pi User';
  const piUserId = piUser?.uid || 'N/A';

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Profile Header */}
      <LinearGradient
        colors={[colors.primary, colors.darkTeal]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <View style={styles.avatarContainer}>
          <IconSymbol 
            ios_icon_name="person.circle.fill" 
            android_material_icon_name="account-circle" 
            size={80} 
            color="#FFFFFF" 
          />
        </View>
        {authenticated ? (
          <>
            <Text style={styles.headerName}>{piUserName}</Text>
            <Text style={styles.headerSubtitle}>Pi Network Member</Text>
          </>
        ) : (
          <>
            <Text style={styles.headerName}>Welcome</Text>
            <Text style={styles.headerSubtitle}>Sign in to get started</Text>
          </>
        )}
      </LinearGradient>

      {/* Authentication Section */}
      {!authenticated ? (
        <View style={styles.authSection}>
          <View style={styles.authCard}>
            <IconSymbol 
              ios_icon_name="lock.circle.fill" 
              android_material_icon_name="lock" 
              size={48} 
              color={colors.primary} 
            />
            <Text style={styles.authTitle}>Sign In Required</Text>
            <Text style={styles.authDescription}>
              Connect your Pi account to access all features and personalize your experience
            </Text>
            <TouchableOpacity 
              style={styles.loginButton}
              onPress={handleLogin}
              disabled={loading}
            >
              <LinearGradient
                colors={[colors.primary, colors.darkTeal]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.loginButtonGradient}
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.loginButtonText}>{buttonText}</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          {/* User Info Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account Information</Text>
            <View style={styles.infoCard}>
              <View style={styles.infoRow}>
                <IconSymbol 
                  ios_icon_name="person.fill" 
                  android_material_icon_name="person" 
                  size={20} 
                  color={colors.textSecondary} 
                />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Username</Text>
                  <Text style={styles.infoValue}>{piUserName}</Text>
                </View>
              </View>
              <View style={styles.infoDivider} />
              <View style={styles.infoRow}>
                <IconSymbol 
                  ios_icon_name="number.circle.fill" 
                  android_material_icon_name="info" 
                  size={20} 
                  color={colors.textSecondary} 
                />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>User ID</Text>
                  <Text style={styles.infoValue}>{piUserId}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Stats Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Stats</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>0</Text>
                <Text style={styles.statLabel}>Posts</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>0</Text>
                <Text style={styles.statLabel}>Connections</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>0</Text>
                <Text style={styles.statLabel}>Activities</Text>
              </View>
            </View>
          </View>

          {/* Menu Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Settings</Text>
            <View style={styles.menuCard}>
              <TouchableOpacity style={styles.menuItem}>
                <IconSymbol 
                  ios_icon_name="bell.fill" 
                  android_material_icon_name="notifications" 
                  size={22} 
                  color={colors.textSecondary} 
                />
                <Text style={styles.menuText}>Notifications</Text>
                <IconSymbol 
                  ios_icon_name="chevron.right" 
                  android_material_icon_name="arrow-forward" 
                  size={20} 
                  color={colors.textSecondary} 
                />
              </TouchableOpacity>
              <View style={styles.menuDivider} />
              <TouchableOpacity style={styles.menuItem}>
                <IconSymbol 
                  ios_icon_name="lock.fill" 
                  android_material_icon_name="lock" 
                  size={22} 
                  color={colors.textSecondary} 
                />
                <Text style={styles.menuText}>Privacy</Text>
                <IconSymbol 
                  ios_icon_name="chevron.right" 
                  android_material_icon_name="arrow-forward" 
                  size={20} 
                  color={colors.textSecondary} 
                />
              </TouchableOpacity>
              <View style={styles.menuDivider} />
              <TouchableOpacity style={styles.menuItem}>
                <IconSymbol 
                  ios_icon_name="questionmark.circle.fill" 
                  android_material_icon_name="help" 
                  size={22} 
                  color={colors.textSecondary} 
                />
                <Text style={styles.menuText}>Help & Support</Text>
                <IconSymbol 
                  ios_icon_name="chevron.right" 
                  android_material_icon_name="arrow-forward" 
                  size={20} 
                  color={colors.textSecondary} 
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Logout Button */}
          <View style={styles.section}>
            <TouchableOpacity 
              style={styles.logoutButton}
              onPress={handleLogout}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? (
                <ActivityIndicator color={colors.error} />
              ) : (
                <>
                  <IconSymbol 
                    ios_icon_name="arrow.right.square.fill" 
                    android_material_icon_name="logout" 
                    size={20} 
                    color={colors.error} 
                  />
                  <Text style={styles.logoutButtonText}>{logoutButtonText}</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundAlt,
  },
  contentContainer: {
    paddingBottom: 100,
  },
  headerGradient: {
    width: '100%',
    paddingTop: 20,
    paddingBottom: 32,
    alignItems: 'center',
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  authSection: {
    padding: 20,
  },
  authCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  authTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  authDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  loginButton: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  loginButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  infoContent: {
    marginLeft: 12,
    flex: 1,
  },
  infoLabel: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  infoDivider: {
    height: 1,
    backgroundColor: colors.border,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  menuCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  menuText: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
    marginLeft: 12,
  },
  menuDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: 50,
  },
  logoutButton: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.error,
    marginLeft: 8,
  },
});
