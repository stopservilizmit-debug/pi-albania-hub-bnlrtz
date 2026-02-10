
import React from "react";
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Platform } from "react-native";
import { useTheme } from "@react-navigation/native";
import { colors } from "@/styles/commonStyles";
import { IconSymbol } from "@/components/IconSymbol";
import { usePi } from "@/contexts/PiContext";

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
  console.log('HomeScreen: Rendering home screen (iOS)');
  const theme = useTheme();
  const { authenticated, piUser, loading } = usePi();

  const handleCardPress = (cardId: string) => {
    console.log('HomeScreen: User tapped card:', cardId);
    alert(`${cardId} section coming soon!`);
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
          <View style={styles.loginCard}>
            <View style={styles.loginIconContainer}>
              <IconSymbol 
                ios_icon_name="person.circle" 
                android_material_icon_name="account-circle" 
                size={48} 
                color="#DC2626" 
              />
            </View>
            <Text style={styles.welcomeTitle}>Welcome!</Text>
            <Text style={styles.welcomeSubtitle}>Login with Pi to access full features</Text>
            <TouchableOpacity 
              style={styles.loginButton}
              onPress={() => {
                console.log('User tapped Login with Pi button');
                alert('Pi login will be implemented');
              }}
              activeOpacity={0.8}
            >
              <Text style={styles.loginButtonText}>Login with Pi</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Welcome message for authenticated users */}
        {authenticated && piUser && (
          <View style={styles.welcomeCard}>
            <IconSymbol 
              ios_icon_name="checkmark.circle.fill" 
              android_material_icon_name="check-circle" 
              size={24} 
              color="#059669" 
            />
            <Text style={styles.welcomeUserText}>Welcome back, {piUser.username}!</Text>
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
    paddingTop: 60,
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
  loginCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  loginIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#DC2626',
    paddingHorizontal: 48,
    paddingVertical: 14,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  welcomeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 24,
  },
  welcomeUserText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#065F46',
    marginLeft: 10,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
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
