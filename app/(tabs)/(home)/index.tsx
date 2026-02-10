
import { useTheme } from "@react-navigation/native";
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Platform, Image } from "react-native";
import React from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from "@/styles/commonStyles";
import { usePi } from "@/contexts/PiContext";
import { IconSymbol } from "@/components/IconSymbol";

interface CategoryCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const categoryCards: CategoryCard[] = [
  {
    id: 'today',
    title: 'Today',
    description: 'Latest news and updates from Albania',
    icon: 'calendar-today',
    color: colors.primary,
  },
  {
    id: 'community',
    title: 'Community',
    description: 'Connect with people and share posts',
    icon: 'group',
    color: colors.secondary,
  },
  {
    id: 'made-in-albania',
    title: 'Made in Albania',
    description: 'Discover local products and businesses',
    icon: 'store',
    color: colors.accent,
  },
  {
    id: 'discover',
    title: 'Discover',
    description: 'Explore services and opportunities',
    icon: 'explore',
    color: colors.info,
  },
];

export default function HomeScreen() {
  const { piUser, authenticated, loading, signInWithPi } = usePi();
  const theme = useTheme();

  const handleCardPress = (cardId: string) => {
    console.log('User tapped card:', cardId);
  };

  const handleLogin = async () => {
    console.log('User tapped Login with Pi button');
    try {
      await signInWithPi();
    } catch (error) {
      console.error('Login failed:', error);
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

      {/* Authentication Card */}
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
              size={64} 
              color="#FFFFFF" 
            />
            <Text style={styles.authTitle}>Welcome to Albania Hub</Text>
            <Text style={styles.authSubtitle}>Sign in with Pi to get started</Text>
            <TouchableOpacity 
              style={styles.loginButton}
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={styles.loginButtonText}>
                {loading ? 'Connecting...' : 'Login with Pi'}
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      ) : (
        <View style={styles.welcomeCard}>
          <LinearGradient
            colors={[colors.primary, colors.secondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.welcomeGradient}
          >
            <IconSymbol 
              ios_icon_name="checkmark.circle.fill" 
              android_material_icon_name="check-circle" 
              size={48} 
              color="#FFFFFF" 
            />
            <Text style={styles.welcomeTitle}>Welcome back!</Text>
            <Text style={styles.welcomeUsername}>{piUser?.username || 'Pi User'}</Text>
          </LinearGradient>
        </View>
      )}

      {/* Category Cards */}
      <View style={styles.cardsContainer}>
        <Text style={styles.sectionTitle}>Explore Albania Hub</Text>
        {categoryCards.map((card) => (
          <TouchableOpacity
            key={card.id}
            style={styles.categoryCard}
            onPress={() => handleCardPress(card.id)}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={[card.color, card.color + 'CC']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.cardGradient}
            >
              <View style={styles.cardIconContainer}>
                <IconSymbol 
                  ios_icon_name="square.fill" 
                  android_material_icon_name={card.icon} 
                  size={32} 
                  color="#FFFFFF" 
                />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{card.title}</Text>
                <Text style={styles.cardDescription}>{card.description}</Text>
              </View>
              <IconSymbol 
                ios_icon_name="chevron.right" 
                android_material_icon_name="arrow-forward" 
                size={24} 
                color="#FFFFFF" 
              />
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>
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
    padding: 32,
    alignItems: 'center',
  },
  authTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 16,
    textAlign: 'center',
  },
  authSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    marginTop: 8,
    textAlign: 'center',
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
  welcomeCard: {
    margin: 20,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  welcomeGradient: {
    padding: 24,
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 12,
  },
  welcomeUsername: {
    fontSize: 18,
    color: '#FFFFFF',
    marginTop: 4,
    opacity: 0.9,
  },
  cardsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  categoryCard: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  cardIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
});
