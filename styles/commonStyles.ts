
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  primary: '#7C3AED',      // Deep purple - rich and elegant
  secondary: '#A78BFA',    // Light purple - soft accent
  accent: '#FFD700',       // Gold - luxurious accent
  background: '#FFFFFF',   // Light background
  backgroundAlt: '#F8F9FA', // Slightly gray background
  text: '#2D3436',         // Dark charcoal text
  textSecondary: '#636E72', // Gray text
  card: '#FFFFFF',         // White cards
  border: '#DFE6E9',       // Light border
  highlight: '#FFF5E1',    // Cream highlight
  success: '#00B894',      // Emerald green
  error: '#D63031',        // Red
  purple: '#7C3AED',       // Deep purple
  lightPurple: '#A78BFA',  // Light purple
  gold: '#FFD700',         // Gold
  darkPurple: '#5B21B6',   // Dark purple for gradients
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
