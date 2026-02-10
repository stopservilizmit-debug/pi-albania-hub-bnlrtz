
import { useTheme } from "@react-navigation/native";
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Platform, ActivityIndicator, Image } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from "@/styles/commonStyles";
import { usePi } from "@/contexts/PiContext";
import { IconSymbol } from "@/components/IconSymbol";

export default function ProfileScreen() {
  const { piUser, authenticated, loading, signInWithPi, signOut } = usePi();
  const [loggingOut, setLoggingOut] = useState(false);
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
    setLoggingOut(true);
    try {
      await signOut();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Modern Header with Logo */}
      <View style={styles.headerContainer}>
        <Image 
          source={require('@/assets/images/a4fd3787-6215-489f-a37b-bad6d6a6fc8e.png')}
          style={styles.headerLogo}
          resizeMode="contain"
        />
      </View>

      {!authenticated ? (
        <View style={styles.authCard}>
          <LinearGradient
            colors={[colors.primary, colors.secondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.authGradient}
          >
            <IconSymbol 
              ios_icon_name="person.circle.fill" 
              android_material_icon_name="account-circle" 
              size={80} 
              color="#FFFFFF" 
            />
            <Text style={styles.authTitle}>Profile</Text>
            <Text style={styles.authSubtitle}>Sign in to access your profile</Text>
            <TouchableOpacity 
              style={styles.loginButton}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={colors.primary} />
              ) : (
                <Text style={styles.loginButtonText}>Login with Pi</Text>
              )}
            </TouchableOpacity>
          </LinearGradient>
        </View>
      ) : (
        <View style={styles.profileContainer}>
          <View style={styles.profileCard}>
            <LinearGradient
              colors={[colors.primary, colors.secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.profileGradient}
            >
              <IconSymbol 
                ios_icon_name="person.circle.fill" 
                android_material_icon_name="account-circle" 
                size={80} 
                color="#FFFFFF" 
              />
              <Text style={styles.profileUsername}>{piUser?.username || 'Pi User'}</Text>
              <Text style={styles.profileId}>ID: {piUser?.uid || 'N/A'}</Text>
            </LinearGradient>
          </View>

          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuItem}>
              <IconSymbol 
                ios_icon_name="person.fill" 
                android_material_icon_name="person" 
                size={24} 
                color={colors.primary} 
              />
              <Text style={styles.menuText}>Account Settings</Text>
              <IconSymbol 
                ios_icon_name="chevron.right" 
                android_material_icon_name="arrow-forward" 
                size={20} 
                color={colors.text} 
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <IconSymbol 
                ios_icon_name="bell.fill" 
                android_material_icon_name="notifications" 
                size={24} 
                color={colors.primary} 
              />
              <Text style={styles.menuText}>Notifications</Text>
              <IconSymbol 
                ios_icon_name="chevron.right" 
                android_material_icon_name="arrow-forward" 
                size={20} 
                color={colors.text} 
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <IconSymbol 
                ios_icon_name="gear" 
                android_material_icon_name="settings" 
                size={24} 
                color={colors.primary} 
              />
              <Text style={styles.menuText}>Settings</Text>
              <IconSymbol 
                ios_icon_name="chevron.right" 
                android_material_icon_name="arrow-forward" 
                size={20} 
                color={colors.text} 
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <IconSymbol 
                ios_icon_name="questionmark.circle.fill" 
                android_material_icon_name="help" 
                size={24} 
                color={colors.primary} 
              />
              <Text style={styles.menuText}>Help & Support</Text>
              <IconSymbol 
                ios_icon_name="chevron.right" 
                android_material_icon_name="arrow-forward" 
                size={20} 
                color={colors.text} 
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={handleLogout}
            disabled={loggingOut}
          >
            {loggingOut ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <>
                <IconSymbol 
                  ios_icon_name="arrow.right.square.fill" 
                  android_material_icon_name="exit-to-app" 
                  size={24} 
                  color="#FFFFFF" 
                />
                <Text style={styles.logoutButtonText}>Logout</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
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
  headerContainer: {
    width: '100%',
    height: 200,
    backgroundColor: '#2C3E50',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 48 : 0,
  },
  headerLogo: {
    width: '80%',
    height: 120,
  },
  authCard: {
    margin: 20,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  authGradient: {
    padding: 40,
    alignItems: 'center',
  },
  authTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 16,
  },
  authSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    marginTop: 8,
    opacity: 0.9,
  },
  loginButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 25,
    marginTop: 24,
    minWidth: 200,
    alignItems: 'center',
  },
  loginButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  profileContainer: {
    padding: 20,
  },
  profileCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  profileGradient: {
    padding: 32,
    alignItems: 'center',
  },
  profileUsername: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 16,
  },
  profileId: {
    fontSize: 14,
    color: '#FFFFFF',
    marginTop: 4,
    opacity: 0.8,
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    marginLeft: 16,
  },
  logoutButton: {
    backgroundColor: colors.error,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
