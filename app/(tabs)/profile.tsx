
import React from "react";
import { useTheme } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/IconSymbol";
import { View, Text, StyleSheet, ScrollView, Platform, TouchableOpacity, ActivityIndicator } from "react-native";
import { colors } from "@/styles/commonStyles";
import { usePi } from "@/contexts/PiContext";

export default function ProfileScreen() {
  console.log('ProfileScreen: Rendering profile screen');
  const theme = useTheme();
  const { piUser, authenticated, loading, piSDKLoaded, signInWithPi, signOut } = usePi();

  const handleLogin = async () => {
    console.log('ProfileScreen: User tapped Login with Pi button');
    await signInWithPi();
  };

  const handleLogout = () => {
    console.log('ProfileScreen: User tapped Logout button');
    signOut();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.iconCircle}>
            <IconSymbol
              ios_icon_name="person.circle.fill"
              android_material_icon_name="account-circle"
              size={64}
              color={colors.primary}
            />
          </View>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        {/* Loading State */}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Loading Pi SDK...</Text>
          </View>
        )}

        {/* Not Authenticated State */}
        {!loading && !authenticated && (
          <View style={styles.authContainer}>
            <View style={styles.infoCard}>
              <IconSymbol
                ios_icon_name="info.circle.fill"
                android_material_icon_name="info"
                size={32}
                color={colors.primary}
              />
              <Text style={styles.infoTitle}>Welcome to Pi Albania Hub</Text>
              <Text style={styles.infoText}>
                Sign in with your Pi account to access personalized features and connect with the Albanian Pi community.
              </Text>
            </View>

            {piSDKLoaded ? (
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
                activeOpacity={0.8}
              >
                <IconSymbol
                  ios_icon_name="person.badge.key.fill"
                  android_material_icon_name="vpn-key"
                  size={24}
                  color="#FFFFFF"
                />
                <Text style={styles.loginButtonText}>Login with Pi</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.sdkWarning}>
                <IconSymbol
                  ios_icon_name="exclamationmark.triangle.fill"
                  android_material_icon_name="warning"
                  size={24}
                  color={colors.accent}
                />
                <Text style={styles.sdkWarningText}>
                  Pi SDK is not available. Please open this app in Pi Browser.
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Authenticated State */}
        {!loading && authenticated && piUser && (
          <View style={styles.profileContainer}>
            {/* User Info Card */}
            <View style={styles.userCard}>
              <View style={styles.userIconContainer}>
                <IconSymbol
                  ios_icon_name="person.circle.fill"
                  android_material_icon_name="account-circle"
                  size={80}
                  color={colors.primary}
                />
              </View>
              <Text style={styles.username}>@{piUser.username}</Text>
              <Text style={styles.userId}>User ID: {piUser.uid}</Text>
            </View>

            {/* Stats Cards */}
            <View style={styles.statsContainer}>
              <View style={styles.statCard}>
                <IconSymbol
                  ios_icon_name="star.fill"
                  android_material_icon_name="star"
                  size={28}
                  color={colors.accent}
                />
                <Text style={styles.statValue}>0</Text>
                <Text style={styles.statLabel}>Contributions</Text>
              </View>
              <View style={styles.statCard}>
                <IconSymbol
                  ios_icon_name="heart.fill"
                  android_material_icon_name="favorite"
                  size={28}
                  color={colors.success}
                />
                <Text style={styles.statValue}>0</Text>
                <Text style={styles.statLabel}>Favorites</Text>
              </View>
            </View>

            {/* Account Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Account</Text>
              <View style={styles.menuItem}>
                <IconSymbol
                  ios_icon_name="person.fill"
                  android_material_icon_name="person"
                  size={24}
                  color={colors.textSecondary}
                />
                <Text style={styles.menuItemText}>Edit Profile</Text>
                <IconSymbol
                  ios_icon_name="chevron.right"
                  android_material_icon_name="chevron-right"
                  size={24}
                  color={colors.textSecondary}
                />
              </View>
              <View style={styles.menuItem}>
                <IconSymbol
                  ios_icon_name="bell.fill"
                  android_material_icon_name="notifications"
                  size={24}
                  color={colors.textSecondary}
                />
                <Text style={styles.menuItemText}>Notifications</Text>
                <IconSymbol
                  ios_icon_name="chevron.right"
                  android_material_icon_name="chevron-right"
                  size={24}
                  color={colors.textSecondary}
                />
              </View>
            </View>

            {/* Settings Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Settings</Text>
              <View style={styles.menuItem}>
                <IconSymbol
                  ios_icon_name="gear"
                  android_material_icon_name="settings"
                  size={24}
                  color={colors.textSecondary}
                />
                <Text style={styles.menuItemText}>Preferences</Text>
                <IconSymbol
                  ios_icon_name="chevron.right"
                  android_material_icon_name="chevron-right"
                  size={24}
                  color={colors.textSecondary}
                />
              </View>
              <View style={styles.menuItem}>
                <IconSymbol
                  ios_icon_name="questionmark.circle.fill"
                  android_material_icon_name="help"
                  size={24}
                  color={colors.textSecondary}
                />
                <Text style={styles.menuItemText}>Help & Support</Text>
                <IconSymbol
                  ios_icon_name="chevron.right"
                  android_material_icon_name="chevron-right"
                  size={24}
                  color={colors.textSecondary}
                />
              </View>
            </View>

            {/* Logout Button */}
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
              activeOpacity={0.8}
            >
              <IconSymbol
                ios_icon_name="arrow.right.square.fill"
                android_material_icon_name="logout"
                size={24}
                color={colors.error}
              />
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appInfoText}>Pi Albania Hub v1.0.0</Text>
          <Text style={styles.appInfoText}>Connected to albania.pi</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: Platform.OS === 'android' ? 24 : 0,
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 16,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 16,
  },
  authContainer: {
    alignItems: 'center',
  },
  infoCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    width: '100%',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.06)',
    elevation: 2,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  loginButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
    boxShadow: '0px 4px 12px rgba(124, 58, 237, 0.3)',
    elevation: 4,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginLeft: 12,
  },
  sdkWarning: {
    backgroundColor: colors.accent + '15',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    width: '100%',
  },
  sdkWarningText: {
    fontSize: 14,
    color: colors.accent,
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
  profileContainer: {
    width: '100%',
  },
  userCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.06)',
    elevation: 2,
  },
  userIconContainer: {
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
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.06)',
    elevation: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  menuItem: {
    backgroundColor: colors.card,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.06)',
    elevation: 2,
  },
  menuItemText: {
    fontSize: 16,
    color: colors.text,
    flex: 1,
    marginLeft: 12,
  },
  logoutButton: {
    backgroundColor: colors.error + '15',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginTop: 8,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.error,
    marginLeft: 12,
  },
  appInfo: {
    alignItems: 'center',
    marginTop: 32,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  appInfoText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
});
