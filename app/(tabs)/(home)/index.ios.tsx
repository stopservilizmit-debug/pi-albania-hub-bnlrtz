
import { useTheme } from "@react-navigation/native";
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Platform } from "react-native";
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
  gradientColors: string[];
}

const categoryCards: CategoryCard[] = [
  {
    id: 'today',
    title: 'Today',
    description: 'Latest news and updates',
    icon: 'calendar-today',
    gradientColors: ['#9333EA', '#7E22CE'],
  },
  {
    id: 'community',
    title: 'Community',
    description: 'Connect with people',
    icon: 'group',
    gradientColors: ['#D4AF37', '#B8941F'],
  },
  {
    id: 'made-in-albania',
    title: 'Made in Albania',
    description: 'Local products & businesses',
    icon: 'store',
    gradientColors: ['#9333EA', '#D4AF37'],
  },
  {
    id: 'discover',
    title: 'Discover',
    description: 'Services & opportunities',
    icon: 'explore',
    gradientColors: ['#FFD700', '#D4AF37'],
  },
  {
    id: 'games',
    title: 'Games',
    description: 'Play and compete',
    icon: 'videogame-asset',
    gradientColors: ['#8B0000', '#DC143C'],
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

  const loadingText = 'Connecting...';
  const loginText = 'Login with Pi';
  const buttonText = loading ? loadingText : loginText;

  const welcomeBackText = 'Welcome back!';
  const piUserName = piUser?.username || 'Pi User';

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Hero Section */}
      <LinearGradient
        colors={['#000000', '#1A1A1A']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.heroSection}
      >
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>Albania Hub</Text>
          <LinearGradient
            colors={['#D4AF37', '#FFD700']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.goldUnderline}
          />
          <Text style={styles.heroSubtitle}>The Digital Infrastructure of Albania.pi</Text>
        </View>
      </LinearGradient>

      {/* Authentication Card */}
      {!authenticated ? (
        <View style={styles.authCard}>
          <View style={styles.authIconContainer}>
            <IconSymbol 
              ios_icon_name="person.circle.fill" 
              android_material_icon_name="account-circle" 
              size={56} 
              color={colors.gold} 
            />
          </View>
          <Text style={styles.authTitle}>Get Started</Text>
          <Text style={styles.authSubtitle}>Sign in with Pi to unlock all features</Text>
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
              <Text style={styles.loginButtonText}>{buttonText}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.welcomeCard}>
          <View style={styles.welcomeIconContainer}>
            <IconSymbol 
              ios_icon_name="checkmark.circle.fill" 
              android_material_icon_name="check-circle" 
              size={40} 
              color={colors.gold} 
            />
          </View>
          <View style={styles.welcomeTextContainer}>
            <Text style={styles.welcomeTitle}>{welcomeBackText}</Text>
            <Text style={styles.welcomeUsername}>{piUserName}</Text>
          </View>
        </View>
      )}

      {/* Category Cards */}
      <View style={styles.cardsContainer}>
        <Text style={styles.sectionTitle}>Explore</Text>
        <View style={styles.cardsGrid}>
          {categoryCards.map((card) => (
            <React.Fragment key={card.id}>
              <TouchableOpacity
                style={styles.categoryCard}
                onPress={() => handleCardPress(card.id)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={card.gradientColors}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.cardGradient}
                >
                  <View style={styles.cardIconContainer}>
                    <IconSymbol 
                      ios_icon_name="square.fill" 
                      android_material_icon_name={card.icon} 
                      size={28} 
                      color="#FFFFFF" 
                    />
                  </View>
                  <Text style={styles.cardTitle}>{card.title}</Text>
                  <Text style={styles.cardDescription}>{card.description}</Text>
                </LinearGradient>
              </TouchableOpacity>
            </React.Fragment>
          ))}
        </View>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>Quick Stats</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>1.2K</Text>
            <Text style={styles.statLabel}>Members</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>350</Text>
            <Text style={styles.statLabel}>Businesses</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>48</Text>
            <Text style={styles.statLabel}>Services</Text>
          </View>
        </View>
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
  heroSection: {
    width: '100%',
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  heroContent: {
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 8,
    textAlign: 'center',
  },
  goldUnderline: {
    width: 80,
    height: 3,
    borderRadius: 2,
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  authCard: {
    margin: 20,
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  authIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.backgroundAlt,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: colors.gold,
  },
  authTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 8,
  },
  authSubtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
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
  welcomeCard: {
    margin: 20,
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gold,
  },
  welcomeIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.backgroundAlt,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  welcomeTextContainer: {
    flex: 1,
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
    marginBottom: 4,
  },
  welcomeUsername: {
    fontSize: 16,
    color: colors.gold,
    fontWeight: '500',
  },
  cardsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 16,
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  categoryCard: {
    width: '48%',
    marginHorizontal: '1%',
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardGradient: {
    padding: 20,
    minHeight: 140,
    justifyContent: 'space-between',
  },
  cardIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 13,
    color: colors.white,
    opacity: 0.9,
  },
  statsContainer: {
    padding: 20,
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
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: colors.textSecondary,
  },
});
