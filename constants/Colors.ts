/**
 * Global color scheme for the app in both light and dark modes.
 * These colors are used consistently across all components.
 */

export const Colors = {
  light: {
    primary: '#00BCD4',
    secondary: '#7B61FF',
    background: '#FFFFFF',
    card: '#e4cfcfff',
    cardShadow: '#E5E5E5',
    text: '#1A1A1A',
    textSecondary: '#666666',
    border: '#E5E5E5',
    notification: '#FF3B30',
    tabBarBackground: '#FFFFFF',
    tabBarInactive: '#999999',
    tabBarActive: '#00BCD4',
    surface: '#FFFFFF',
    surfaceVariant: '#F8F9FA',
    accent: '#00BCD4',
    link: '#00BCD4',
    joinButton: '#00BCD4',
    cardBackground: '#FFFFFF',
    theme: {
      background: '#e1f5fe',
      text: '#0288d1',
    },
  },
  dark: {
    primary: '#00BCD4',
    secondary: '#7B61FF',
    background: '#0A0A0A',
    card: '#1E1E1E',
    cardShadow: '#000000',
    text: '#FFFFFF',
    textSecondary: '#AAAAAA',
    border: '#2C2C2C',
    notification: '#FF453A',
    tabBarBackground: '#1E1E1E',
    tabBarInactive: '#666666',
    tabBarActive: '#00BCD4',
    surface: '#1E1E1E',
    surfaceVariant: '#2C2C2C',
    accent: '#00BCD4',
    link: '#00BCD4',
    joinButton: '#00BCD4',
    cardBackground: '#1E1E1E',
    theme: {
      background: '#1A237E',
      text: '#E1F5FE',
    },
  },
} as const;

export type ThemeColors = typeof Colors.light;


