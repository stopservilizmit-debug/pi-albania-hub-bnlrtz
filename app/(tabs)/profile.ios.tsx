
import React from "react";
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Platform } from "react-native";
import { useTheme } from "@react-navigation/native";
import { colors } from "@/styles/commonStyles";
import { IconSymbol } from "@/components/IconSymbol";
import { usePi } from "@/contexts/PiContext";

export default function ProfileScreen() {
  console.log('ProfileScreen (iOS): Rendering profile screen');
  const theme = useTheme();
  const { authenticated, piUser, loading, piSDKLoaded, signInWithPi, signOut } = usePi();

  const handleSignIn = async () => {
    console.log('ProfileScreen (iOS): User tapped Sign In with Pi button');
    await signInWithPi();
  };

  const handleSignOut = () => {
    console.log('ProfileScreen (iOS): User tapped Sign Out button');
    signOut();
  };

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.centerContent}>
          <Text style={styles.loadingText}>Loading Pi SDK...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        {!authenticated ? (
          // Not authenticated - show login
          <View style={styles.authContainer}>
            <View style={styles.iconCircle}>
              <IconSymbol
                ios_icon_name="person.circle.fill"
                android_material_icon_name="account-circle"
                size={80}
                color={colors.primary}
              />
            </View>
            
            <Text style={styles.authTitle}>Welcome to Pi Albania Hub</Text>
            <Text style={styles.authDescription}>
              Sign in with your Pi account to access personalized features and connect with the community.
            </Text>

            {!piSDKLoaded && (
              <View style={styles.warningBox}>
                <IconSymbol
                  ios_icon_name="exclamationmark.triangle.fill"
                  android_material_icon_name="warning"
                  size={24}
                  color={colors.error}
                />
                <Text style={styles.warningText}>
                  Pi SDK is not available. This app works best in Pi Browser.
                </Text>
              </View>
            )}

            <TouchableOpacity
              style={[
                styles.signInButton,
                !piSDKLoaded && styles.signInButtonDisabled
              ]}
              onPress={handleSignIn}
              disabled={!piSDKLoaded}
              activeOpacity={0.8}
            >
              <IconSymbol
                ios_icon_name="person.badge.key.fill"
                android_material_icon_name="vpn-key"
                size={24}
                color="#FFFFFF"
              />
              <Text style={styles.signInButtonText}>Login with Pi</Text>
            </TouchableOpacity>

            {!piSDKLoaded && (
              <Text style={styles.hintText}>
                Please open this app in Pi Browser to use Pi Authentication
              </Text>
            )}
          </View>
        ) : (
          // Authenticated - show profile
          <View style={styles.profileContainer}>
            <View style={styles.profileHeader}>
              <View style={styles.avatarContainer}>
                <IconSymbol
                  ios_icon_name="person.circle.fill"
                  android_material_icon_name="account-circle"
                  size={100}
                  color={colors.primary}
                />
              </View>
              <Text style={styles.username}>{piUser?.username}</Text>
              <Text style={styles.userId}>UID: {piUser?.uid}</Text>
            </View>

            <View style={styles.infoCard}>
              <View style={styles.infoRow}>
                <IconSymbol
                  ios_icon_name="checkmark.circle.fill"
                  android_material_icon_name="check-circle"
                  size={24}
                  color={colors.success}
                />
                <Text style={styles.infoText}>Authenticated with Pi Network</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>About Your Account</Text>
              <Text style={styles.sectionText}>
                You are signed in with Pi Authentication. Your Pi username and UID are used 
                to personalize your experience in the Pi Albania Hub.
              </Text>
            </View>

            <TouchableOpacity
              style={styles.signOutButton}
              onPress={handleSignOut}
              activeOpacity={0.8}
            >
              <IconSymbol
                ios_icon_name="arrow.right.square.fill"
                android_material_icon_name="logout"
                size={24}
                color={colors.error}
              />
              <Text style={styles.signOutButtonText}>Sign Out</Text>
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
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  header: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
  },
  authContainer: {
    alignItems: 'center',
    paddingTop: 40,
  },
  iconCircle: {
    marginBottom: 24,
  },
  authTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  authDescription: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  warningBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.error + '10',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    width: '100%',
  },
  warningText: {
    flex: 1,
    fontSize: 14,
    color: colors.error,
    marginLeft: 12,
    lineHeight: 20,
  },
  signInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
    boxShadow: '0px 4px 12px rgba(124, 58, 237, 0.3)',
    elevation: 4,
  },
  signInButtonDisabled: {
    backgroundColor: colors.textSecondary,
    opacity: 0.5,
  },
  signInButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginLeft: 12,
  },
  hintText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 16,
    fontStyle: 'italic',
  },
  profileContainer: {
    alignItems: 'center',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  username: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  userId: {
    fontSize: 14,
    color: colors.textSecondary,
    fontFamily: 'Courier',
  },
  infoCard: {
    backgroundColor: colors.success + '10',
    padding: 16,
    borderRadius: 12,
    width: '100%',
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.success,
    marginLeft: 12,
  },
  section: {
    width: '100%',
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.backgroundAlt,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    width: '100%',
  },
  signOutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.error,
    marginLeft: 12,
  },
});
