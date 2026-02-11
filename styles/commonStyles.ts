
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  // Modern deep blue and coral palette
  primary: '#2563EB',      // Deep blue - professional and trustworthy
  secondary: '#7C3AED',    // Purple - creative accent
  accent: '#EC4899',       // Pink - vibrant highlight
  background: '#FFFFFF',   // Clean white
  backgroundAlt: '#F1F5F9', // Subtle gray-blue
  text: '#0F172A',         // Deep slate
  textSecondary: '#64748B', // Medium slate
  card: '#FFFFFF',         // White cards
  border: '#E2E8F0',       // Light border
  highlight: '#FEF3C7',    // Warm yellow highlight
  success: '#10B981',      // Green
  error: '#EF4444',        // Red
  blue: '#2563EB',         // Deep blue
  purple: '#7C3AED',       // Purple
  pink: '#EC4899',         // Pink
  darkBlue: '#1E40AF',     // Dark blue for gradients
  darkPurple: '#6D28D9',   // Dark purple for gradients
};

export const buttonStyles = StyleSheet.create({
  instructionsButton: {
    backgroundColor: colors.primary,
    alignSelf: 'center',
    width: '100%',
  },
  backButton: {
    backgroundColor: colors.backgroundAlt,
    alignSelf: 'center',
    width: '100%',
  },
});

export const commonStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 800,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    color: colors.text,
    marginBottom: 10
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 8,
    lineHeight: 24,
    textAlign: 'center',
  },
  section: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    width: '100%',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  icon: {
    width: 60,
    height: 60,
    tintColor: colors.primary,
  },
});
