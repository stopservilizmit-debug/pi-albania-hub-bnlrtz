
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  // Near-black anthracite with deep red accents - Luxury tech aesthetic
  anthracite: '#0B0C10',      // Near-black background (main)
  darkGray: '#1A1A1A',        // Dark gray for cards
  deepRed: '#8B0000',         // Deep red accent (dark red)
  crimson: '#DC143C',         // Crimson for highlights
  darkRed: '#5C0000',         // Even darker red for gradients
  gold: '#D4AF37',            // Gold accent (minimal use)
  brightGold: '#FFD700',      // Bright gold for special highlights
  
  // Semantic colors
  primary: '#8B0000',         // Deep red - main brand color
  secondary: '#DC143C',       // Crimson - accent color
  accent: '#DC143C',          // Crimson - highlights
  background: '#0B0C10',      // Anthracite background
  backgroundAlt: '#1A1A1A',   // Dark gray for cards
  text: '#FFFFFF',            // White text
  textSecondary: '#CCCCCC',   // Light gray text
  card: '#1F1F1F',            // Dark card background
  border: '#333333',          // Dark border
  highlight: '#DC143C',       // Crimson highlight
  success: '#059669',         // Green (keep for status)
  error: '#DC143C',           // Crimson for errors
  
  // Legacy aliases for compatibility
  black: '#0B0C10',           // Anthracite (not pure black)
  white: '#FFFFFF',           // Pure white
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
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.3)',
    elevation: 2,
  },
  icon: {
    width: 60,
    height: 60,
    tintColor: colors.primary,
  },
});
