
import React from "react";
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Platform } from "react-native";
import { useTheme } from "@react-navigation/native";
import { colors } from "@/styles/commonStyles";
import { IconSymbol } from "@/components/IconSymbol";
import { usePi } from "@/contexts/PiContext";

interface HubCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const hubCards: HubCard[] = [
  {
    id: 'today',
    title: 'Today',
    description: 'Latest news and updates from Albania',
    icon: 'calendar-today',
    color: '#7C3AED',
  },
  {
    id: 'community',
    title: 'Community',
    description: 'Connect with people and join discussions',
    icon: 'group',
    color: '#EC4899',
  },
  {
    id: 'made-in-albania',
    title: 'Made in Albania',
    description: 'Discover local products and businesses',
    icon: 'store',
    color: '#10B981',
  },
  {
    id: 'discover',
    title: 'Discover',
    description: 'Explore services and opportunities',
    icon: 'explore',
    color: '#F59E0B',
  },
  {
    id: 'map',
    title: 'Map',
    description: 'Find locations and navigate Albania',
    icon: 'map',
    color: '#3B82F6',
  },
];

export default function HomeScreen() {
  console.log('HomeScreen: Rendering home screen');
  const theme = useTheme();
  const { authenticated, piUser } = usePi();

  const handleCardPress = (cardId: string) => {
    console.log('HomeScreen: User tapped card:', cardId);
    // Placeholder for navigation - will be implemented when sections are built
    alert(`${cardId} section coming soon!`);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Pi Albania Hub</Text>
          <Text style={styles.headerSubtitle}>
            Your gateway to Albania in the Pi ecosystem
          </Text>
          {authenticated && piUser && (
            <View style={styles.welcomeBadge}>
              <IconSymbol 
                ios_icon_name="person.circle.fill" 
                android_material_icon_name="account-circle" 
                size={20} 
                color={colors.primary} 
              />
              <Text style={styles.welcomeText}>Welcome, {piUser.username}!</Text>
            </View>
          )}
        </View>

        {/* Hub Cards */}
        <View style={styles.cardsContainer}>
          {hubCards.map((card, index) => (
            <TouchableOpacity
              key={card.id}
              style={[styles.card, { borderLeftColor: card.color }]}
              onPress={() => handleCardPress(card.id)}
              activeOpacity={0.7}
            >
              <View style={[styles.iconContainer, { backgroundColor: card.color + '15' }]}>
                <IconSymbol
                  ios_icon_name={card.icon}
                  android_material_icon_name={card.icon}
                  size={32}
                  color={card.color}
                />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{card.title}</Text>
                <Text style={styles.cardDescription}>{card.description}</Text>
              </View>
              <IconSymbol
                ios_icon_name="chevron.right"
                android_material_icon_name="chevron-right"
                size={24}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>About Pi Albania Hub</Text>
          <Text style={styles.infoText}>
            This is your starting point for exploring Albania-related experiences in the Pi Network. 
            Navigate through different sections to discover content, connect with the community, 
            and explore local opportunities.
          </Text>
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
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  header: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  welcomeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary + '10',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  welcomeText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    marginLeft: 6,
  },
  cardsContainer: {
    gap: 12,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.06)',
    elevation: 2,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  infoSection: {
    marginTop: 32,
    padding: 16,
    backgroundColor: colors.backgroundAlt,
    borderRadius: 12,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
  },
});
