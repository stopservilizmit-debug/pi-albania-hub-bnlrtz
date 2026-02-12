
import { useTheme } from "@react-navigation/native";
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Platform, ActivityIndicator, Switch } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from "@/styles/commonStyles";
import { usePi } from "@/contexts/PiContext";
import { IconSymbol } from "@/components/IconSymbol";

export default function ProfileScreen() {
  const { piUser, authenticated, loading, signInWithPi, signOut } = usePi();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(true);
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
        colors={['#9333EA', '#7E22CE']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <View style={styles.avatarContainer}>
          <IconSymbol 
            ios_icon_name="person.circle.fill" 
            android_material_icon_name="account-circle" 
            size={80} 
            color={colors.gold} 
          />
        </View>
        {authenticated ? (
          <>
            <Text style={styles.headerName}>{piUserName}</Text>
            <Text style={styles.headerSubtitle}>Pi Network Member</Text>
            <View style={styles.badgeContainer}>
              <View style={styles.badge}>
                <IconSymbol 
                  ios_icon_name="checkmark.seal.fill" 
                  android_material_icon_name="verified" 
                  size={16} 
                  color={colors.gold} 
                />
                <Text style={styles.badgeText}>Verified</Text>
              </View>
            </View>
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
              color={colors.gold} 
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
                colors={[colors.purple, colors.darkPurple]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.loginButtonGradient}
              >
                {loading ? (
                  <ActivityIndicator color={colors.white} />
                ) : (
                  <Text style={styles.loginButtonText}>{buttonText}</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          {/* Quick Actions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.quickActionsGrid}>
              <TouchableOpacity style={styles.quickActionCard}>
                <View style={styles.quickActionIconContainer}>
                  <IconSymbol 
                    ios_icon_name="square.and.pencil" 
                    android_material_icon_name="edit" 
                    size={24} 
                    color={colors.gold} 
                  />
                </View>
                <Text style={styles.quickActionText}>Edit Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickActionCard}>
                <View style={styles.quickActionIconContainer}>
                  <IconSymbol 
                    ios_icon_name="star.fill" 
                    android_material_icon_name="star" 
                    size={24} 
                    color={colors.gold} 
                  />
                </View>
                <Text style={styles.quickActionText}>Favorites</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickActionCard}>
                <View style={styles.quickActionIconContainer}>
                  <IconSymbol 
                    ios_icon_name="clock.fill" 
                    android_material_icon_name="history" 
                    size={24} 
                    color={colors.gold} 
                  />
                </View>
                <Text style={styles.quickActionText}>History</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickActionCard}>
                <View style={styles.quickActionIconContainer}>
                  <IconSymbol 
                    ios_icon_name="square.and.arrow.up" 
                    android_material_icon_name="share" 
                    size={24} 
                    color={colors.gold} 
                  />
                </View>
                <Text style={styles.quickActionText}>Share</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* User Info Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account Information</Text>
            <View style={styles.infoCard}>
              <View style={styles.infoRow}>
                <IconSymbol 
                  ios_icon_name="person.fill" 
                  android_material_icon_name="person" 
                  size={20} 
                  color={colors.gold} 
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
                  color={colors.gold} 
                />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>User ID</Text>
                  <Text style={styles.infoValue}>{piUserId}</Text>
                </View>
              </View>
              <View style={styles.infoDivider} />
              <View style={styles.infoRow}>
                <IconSymbol 
                  ios_icon_name="calendar" 
                  android_material_icon_name="calendar-today" 
                  size={20} 
                  color={colors.gold} 
                />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Member Since</Text>
                  <Text style={styles.infoValue}>January 2025</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Stats Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Stats</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <IconSymbol 
                  ios_icon_name="doc.text.fill" 
                  android_material_icon_name="description" 
                  size={20} 
                  color={colors.gold} 
                />
                <Text style={styles.statNumber}>0</Text>
                <Text style={styles.statLabel}>Posts</Text>
              </View>
              <View style={styles.statCard}>
                <IconSymbol 
                  ios_icon_name="person.2.fill" 
                  android_material_icon_name="group" 
                  size={20} 
                  color={colors.gold} 
                />
                <Text style={styles.statNumber}>0</Text>
                <Text style={styles.statLabel}>Connections</Text>
              </View>
              <View style={styles.statCard}>
                <IconSymbol 
                  ios_icon_name="chart.bar.fill" 
                  android_material_icon_name="trending-up" 
                  size={20} 
                  color={colors.gold} 
                />
                <Text style={styles.statNumber}>0</Text>
                <Text style={styles.statLabel}>Activities</Text>
              </View>
            </View>
          </View>

          {/* Achievements Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Achievements</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.achievementsScroll}>
              <View style={styles.achievementCard}>
                <View style={styles.achievementIconContainer}>
                  <IconSymbol 
                    ios_icon_name="trophy.fill" 
                    android_material_icon_name="emoji-events" 
                    size={32} 
                    color={colors.gold} 
                  />
                </View>
                <Text style={styles.achievementTitle}>Early Adopter</Text>
                <Text style={styles.achievementDescription}>Joined in 2025</Text>
              </View>
              <View style={styles.achievementCard}>
                <View style={styles.achievementIconContainer}>
                  <IconSymbol 
                    ios_icon_name="flame.fill" 
                    android_material_icon_name="local-fire-department" 
                    size={32} 
                    color={colors.gold} 
                  />
                </View>
                <Text style={styles.achievementTitle}>Active User</Text>
                <Text style={styles.achievementDescription}>7 day streak</Text>
              </View>
              <View style={styles.achievementCard}>
                <View style={styles.achievementIconContainer}>
                  <IconSymbol 
                    ios_icon_name="heart.fill" 
                    android_material_icon_name="favorite" 
                    size={32} 
                    color={colors.gold} 
                  />
                </View>
                <Text style={styles.achievementTitle}>Community Star</Text>
                <Text style={styles.achievementDescription}>10+ interactions</Text>
              </View>
            </ScrollView>
          </View>

          {/* Preferences Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferences</Text>
            <View style={styles.menuCard}>
              <View style={styles.menuItemWithSwitch}>
                <View style={styles.menuItemLeft}>
                  <IconSymbol 
                    ios_icon_name="bell.fill" 
                    android_material_icon_name="notifications" 
                    size={22} 
                    color={colors.gold} 
                  />
                  <Text style={styles.menuText}>Notifications</Text>
                </View>
                <Switch
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                  trackColor={{ false: colors.border, true: colors.purple }}
                  thumbColor={notificationsEnabled ? colors.gold : colors.textSecondary}
                />
              </View>
              <View style={styles.menuDivider} />
              <View style={styles.menuItemWithSwitch}>
                <View style={styles.menuItemLeft}>
                  <IconSymbol 
                    ios_icon_name="moon.fill" 
                    android_material_icon_name="dark-mode" 
                    size={22} 
                    color={colors.gold} 
                  />
                  <Text style={styles.menuText}>Dark Mode</Text>
                </View>
                <Switch
                  value={darkModeEnabled}
                  onValueChange={setDarkModeEnabled}
                  trackColor={{ false: colors.border, true: colors.purple }}
                  thumbColor={darkModeEnabled ? colors.gold : colors.textSecondary}
                />
              </View>
            </View>
          </View>

          {/* Settings Menu */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Settings</Text>
            <View style={styles.menuCard}>
              <TouchableOpacity style={styles.menuItem}>
                <IconSymbol 
                  ios_icon_name="person.crop.circle" 
                  android_material_icon_name="account-circle" 
                  size={22} 
                  color={colors.gold} 
                />
                <Text style={styles.menuText}>Account Settings</Text>
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
                  color={colors.gold} 
                />
                <Text style={styles.menuText}>Privacy & Security</Text>
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
                  ios_icon_name="globe" 
                  android_material_icon_name="language" 
                  size={22} 
                  color={colors.gold} 
                />
                <Text style={styles.menuText}>Language</Text>
                <View style={styles.menuItemRight}>
                  <Text style={styles.menuValueText}>English</Text>
                  <IconSymbol 
                    ios_icon_name="chevron.right" 
                    android_material_icon_name="arrow-forward" 
                    size={20} 
                    color={colors.textSecondary} 
                  />
                </View>
              </TouchableOpacity>
              <View style={styles.menuDivider} />
              <TouchableOpacity style={styles.menuItem}>
                <IconSymbol 
                  ios_icon_name="paintbrush.fill" 
                  android_material_icon_name="palette" 
                  size={22} 
                  color={colors.gold} 
                />
                <Text style={styles.menuText}>Appearance</Text>
                <IconSymbol 
                  ios_icon_name="chevron.right" 
                  android_material_icon_name="arrow-forward" 
                  size={20} 
                  color={colors.textSecondary} 
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Support & Info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Support & Information</Text>
            <View style={styles.menuCard}>
              <TouchableOpacity style={styles.menuItem}>
                <IconSymbol 
                  ios_icon_name="questionmark.circle.fill" 
                  android_material_icon_name="help" 
                  size={22} 
                  color={colors.gold} 
                />
                <Text style={styles.menuText}>Help Center</Text>
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
                  ios_icon_name="envelope.fill" 
                  android_material_icon_name="email" 
                  size={22} 
                  color={colors.gold} 
                />
                <Text style={styles.menuText}>Contact Support</Text>
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
                  ios_icon_name="doc.text.fill" 
                  android_material_icon_name="description" 
                  size={22} 
                  color={colors.gold} 
                />
                <Text style={styles.menuText}>Terms & Conditions</Text>
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
                  ios_icon_name="shield.fill" 
                  android_material_icon_name="security" 
                  size={22} 
                  color={colors.gold} 
                />
                <Text style={styles.menuText}>Privacy Policy</Text>
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
                  ios_icon_name="info.circle.fill" 
                  android_material_icon_name="info" 
                  size={22} 
                  color={colors.gold} 
                />
                <Text style={styles.menuText}>About Albania Hub</Text>
                <View style={styles.menuItemRight}>
                  <Text style={styles.menuValueText}>v1.0.0</Text>
                  <IconSymbol 
                    ios_icon_name="chevron.right" 
                    android_material_icon_name="arrow-forward" 
                    size={20} 
                    color={colors.textSecondary} 
                  />
                </View>
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
    backgroundColor: colors.background,
  },
  contentContainer: {
    paddingBottom: 100,
  },
  headerGradient: {
    width: '100%',
    paddingTop: Platform.OS === 'android' ? 60 : 20,
    paddingBottom: 32,
    alignItems: 'center',
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: colors.gold,
  },
  headerName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 15,
    color: colors.white,
    opacity: 0.9,
  },
  badgeContainer: {
    marginTop: 12,
    flexDirection: 'row',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.gold,
  },
  badgeText: {
    color: colors.gold,
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  authSection: {
    padding: 20,
  },
  authCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  authTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
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
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 12,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  quickActionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 11,
    color: colors.white,
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
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
    color: colors.white,
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
    borderWidth: 1,
    borderColor: colors.border,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.gold,
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  achievementsScroll: {
    flexDirection: 'row',
  },
  achievementCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    width: 140,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  achievementIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
    textAlign: 'center',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  menuCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  menuItemWithSwitch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    flex: 1,
    fontSize: 15,
    color: colors.white,
    marginLeft: 12,
  },
  menuValueText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginRight: 8,
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
    borderWidth: 1,
    borderColor: colors.border,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.error,
    marginLeft: 8,
  },
});
