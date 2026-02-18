
import React from "react";
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Platform, Image, ImageSourcePropType } from "react-native";
import { usePi } from "@/contexts/PiContext";
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from "@react-navigation/native";
import { colors } from "@/styles/commonStyles";
import { IconSymbol } from "@/components/IconSymbol";

interface CategoryCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradientColors: string[];
}

// Helper to resolve image sources (handles both local require() and remote URLs)
function resolveImageSource(source: string | number | ImageSourcePropType | undefined): ImageSourcePropType {
  if (!source) return { uri: '' };
  if (typeof source === 'string') return { uri: source };
  return source as ImageSourcePropType;
}

export default function HomeScreen() {
  const { piUser, authenticated, signInWithPi } = usePi();
  const theme = useTheme();

  const handleCardPress = (cardId: string) => {
    console.log('User tapped card:', cardId);
  };

  const handleLogin = async () => {
    console.log('User tapped Login with Pi button');
    await signInWithPi();
  };

  const categoryCards: CategoryCard[] = [
    {
      id: 'today',
      title: 'Today',
      description: 'Latest news and updates from Albania',
      icon: 'calendar-today',
      gradientColors: ['#9333EA', '#7C3AED'],
    },
    {
      id: 'community',
      title: 'Community',
      description: 'Connect with people and explore posts',
      icon: 'group',
      gradientColors: ['#D4AF37', '#B8941F'],
    },
    {
      id: 'made-in-albania',
      title: 'Made in Albania',
      description: 'Discover local products and businesses',
      icon: 'store',
      gradientColors: ['#9333EA', '#7C3AED'],
    },
    {
      id: 'discover',
      title: 'Discover',
      description: 'Explore services and opportunities',
      icon: 'explore',
      gradientColors: ['#D4AF37', '#B8941F'],
    },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Hero Section with New Albanian Eagle Logo */}
      <LinearGradient
        colors={['#000000', '#000000', '#000000']}
        style={styles.heroSection}
      >
        <View style={styles.logoContainer}>
          <Image
            source={resolveImageSource(require('@/assets/images/5b6c6753-8364-4a8b-a3b8-9d7008123d2b.webp'))}
            style={styles.heroLogo}
            resizeMode="contain"
          />
          {/* Black gradient overlay perfectly matching app background #000000 */}
          <LinearGradient
            colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.7)', 'rgba(0, 0, 0, 0.95)', '#000000']}
            locations={[0, 0.4, 0.65, 0.85, 1]}
            style={styles.imageGradientOverlay}
            pointerEvents="none"
          />
        </View>
        
        <View style={styles.heroTextContainer}>
          <Text style={styles.heroTitle}>Albania Hub</Text>
          <Text style={styles.heroSubtitle}>The Digital Infrastructure of Albania.pi</Text>
        </View>

        {!authenticated && (
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
          >
            <LinearGradient
              colors={['#D4AF37', '#B8941F']}
              style={styles.loginButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.loginButtonText}>Login with Pi</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}

        {authenticated && piUser && (
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.usernameText}>{piUser.username}</Text>
          </View>
        )}
      </LinearGradient>

      {/* Category Cards */}
      <View style={styles.cardsContainer}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Explore</Text>
        
        {categoryCards.map((card, index) => (
          <TouchableOpacity
            key={card.id}
            onPress={() => handleCardPress(card.id)}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={card.gradientColors}
              style={styles.card}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
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

      {/* Bottom Spacing */}
      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heroSection: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  logoContainer: {
    width: 200,
    height: 200,
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  heroLogo: {
    width: '100%',
    height: '100%',
  },
  imageGradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  heroTextContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#D4AF37',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  loginButton: {
    width: '100%',
    maxWidth: 300,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  loginButtonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  welcomeContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  welcomeText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  usernameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D4AF37',
  },
  cardsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  cardIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
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
  bottomSpacing: {
    height: 100,
  },
});
