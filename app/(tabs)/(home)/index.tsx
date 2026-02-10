
import React from "react";
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Platform } from "react-native";
import { useTheme } from "@react-navigation/native";
import { colors } from "@/styles/commonStyles";
import { IconSymbol } from "@/components/IconSymbol";
import { usePi } from "@/contexts/PiContext";
import { LinearGradient } from 'expo-linear-gradient';

interface CategoryCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const categoryCards: CategoryCard[] = [
  {
    id: 'services',
    title: 'Services',
    description: 'Local businesses',
    icon: 'business',
    color: '#DC2626',
  },
  {
    id: 'events',
    title: 'Events',
    description: 'Happenings near you',
    icon: 'event',
    color: '#059669',
  },
  {
    id: 'community',
    title: 'Community',
    description: 'Connect & share',
    icon: 'chat',
    color: '#059669',
  },
  {
    id: 'guides',
    title: 'Guides',
    description: 'Tips & insights',
    icon: 'menu-book',
    color: '#DC2626',
  },
];

export default function HomeScreen() {
  console.log('HomeScreen: Rendering home screen');
  const theme = useTheme();
  const { authenticated, piUser, loading, signInWithPi } = usePi();

  const handleCardPress = (cardId: string) => {
    console.log('HomeScreen: User tapped card:', cardId);
    alert(`${cardId} section coming soon!`);
  };

  const handleLogin = async () => {
    console.log('HomeScreen: User tapped Login with Pi button');
    try {
      await signInWithPi();
    } catch (error) {
      console.error('HomeScreen: Login error:', error);
    }
  };

  const servicesCount = '150+';
  const eventsCount = '24';
  const membersCount = '1.2K';

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.appTitle}>Albania Hub</Text>
          <Text style={styles.appSubtitle}>Community-driven local insights</Text>
        </View>

        {/* Login Card - Only show if not authenticated */}
        {!authenticated && !loading && (
          <View style={styles.loginCardWrapper}>
            <LinearGradient
              colors={['#DC2626', '#B91C1C', '#991B1B']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.loginCardGradient}
            >
              <View style={styles.loginIconWrapper}>
                <View style={styles.loginIconCircle}>
                  <IconSymbol 
                    ios_icon_name="person.circle.fill" 
                    android_material_icon_name="account-circle" 
                    size={56} 
                    color="#DC2626" 
                  />
                </View>
              </View>
              
              <Text style={styles.welcomeTitleNew}>Welcome to Albania Hub</Text>
              <Text style={styles.welcomeSubtitleNew}>Connect with Pi Network to unlock exclusive features and join our community</Text>
              
              <TouchableOpacity 
                style={styles.loginButtonNew}
                onPress={handleLogin}
                activeOpacity={0.9}
              >
                <View style={styles.loginButtonContent}>
                  <IconSymbol 
                    ios_icon_name="lock.shield.fill" 
                    android_material_icon_name="verified-user" 
                    size={20} 
                    color="#DC2626" 
                  />
                  <Text style={styles.loginButtonTextNew}>Login with Pi Network</Text>
                </View>
              </TouchableOpacity>

              <View style={styles.benefitsContainer}>
                <View style={styles.benefitItem}>
                  <IconSymbol 
                    ios_icon_name="checkmark.circle.fill" 
                    android_material_icon_name="check-circle" 
                    size={16} 
                    color="#FFFFFF" 
                  />
                  <Text style={styles.benefitText}>Access exclusive services</Text>
                </View>
                <View style={styles.benefitItem}>
                  <IconSymbol 
                    ios_icon_name="checkmark.circle.fill" 
                    android_material_icon_name="check-circle" 
                    size={16} 
                    color="#FFFFFF" 
                  />
                  <Text style={styles.benefitText}>Join community events</Text>
                </View>
                <View style={styles.benefitItem}>
                  <IconSymbol 
                    ios_icon_name="checkmark.circle.fill" 
                    android_material_icon_name="check-circle" 
                    size={16} 
                    color="#FFFFFF" 
                  />
                  <Text style={styles.benefitText}>Secure & verified</Text>
                </View>
              </View>
            </LinearGradient>
          </View>
        )}

        {/* Welcome message for authenticated users */}
        {authenticated && piUser && (
          <View style={styles.welcomeCard}>
            <LinearGradient
              colors={['#059669', '#047857']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.welcomeCardGradient}
            >
              <IconSymbol 
                ios_icon_name="checkmark.circle.fill" 
                android_material_icon_name="check-circle" 
                size={24} 
                color="#FFFFFF" 
              />
              <Text style={styles.welcomeUserText}>Welcome back, {piUser.username}!</Text>
            </LinearGradient>
          </View>
        )}

        {/* Discover Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Discover Albania</Text>
          <Text style={styles.sectionSubtitle}>Explore local insights and connect with your community</Text>
        </View>

        {/* Category Cards Grid */}
        <View style={styles.cardsGrid}>
          {categoryCards.map((card, index) => (
            <React.Fragment key={index}>
              <TouchableOpacity
                style={styles.categoryCard}
                onPress={() => handleCardPress(card.id)}
                activeOpacity={0.7}
              >
                <View style={[styles.categoryIconContainer, { backgroundColor: card.color + '15' }]}>
                  <IconSymbol
                    ios_icon_name={card.icon}
                    android_material_icon_name={card.icon}
                    size={32}
                    color={card.color}
                  />
                </View>
                <Text style={styles.categoryTitle}>{card.title}</Text>
                <Text style={styles.categoryDescription}>{card.description}</Text>
              </TouchableOpacity>
            </React.Fragment>
          ))}
        </View>

        {/* Quick Stats */}
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>Quick Stats</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{servicesCount}</Text>
              <Text style={styles.statLabel}>Services</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: '#059669' }]}>{eventsCount}</Text>
              <Text style={styles.statLabel}>Events</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: '#DC2626' }]}>{membersCount}</Text>
              <Text style={styles.statLabel}>Members</Text>
            </View>
          </View>
        </View>
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
    marginBottom: 24,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  appSubtitle: {
    fontSize: 15,
    color: colors.textSecondary,
  },
  loginCardWrapper: {
    marginBottom: 32,
    borderRadius: 24,
    overflow: 'hidden',
    boxShadow: '0px 8px 24px rgba(220, 38, 38, 0.2)',
    elevation: 8,
  },
  loginCardGradient: {
    padding: 28,
    alignItems: 'center',
  },
  loginIconWrapper: {
    marginBottom: 20,
  },
  loginIconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.15)',
    elevation: 4,
  },
  welcomeTitleNew: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  welcomeSubtitleNew: {
    fontSize: 15,
    color: '#FEE2E2',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  loginButtonNew: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
    elevation: 4,
  },
  loginButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  loginButtonTextNew: {
    color: '#DC2626',
    fontSize: 17,
    fontWeight: '700',
  },
  benefitsContainer: {
    width: '100%',
    gap: 10,
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
  welcomeCard: {
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
    boxShadow: '0px 4px 12px rgba(5, 150, 105, 0.2)',
    elevation: 4,
  },
  welcomeCardGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  welcomeUserText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginLeft: 12,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 6,
  },
  sectionSubtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  categoryCard: {
    width: '48%',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.06)',
    elevation: 2,
  },
  categoryIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
    textAlign: 'center',
  },
  categoryDescription: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  statsCard: {
    backgroundColor: '#FEF2F2',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '800',
    color: '#DC2626',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});
