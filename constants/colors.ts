// Import useTheme for the hook below
import { useTheme } from '@/hooks/use-theme-store';
import { Platform } from 'react-native';

export const lightColors = {
  primary: '#6CB4EE',
  primaryLight: '#A7D1F4',
  secondary: '#FF9A8B',
  secondaryLight: '#FFD0C8',
  text: '#333333',
  textLight: '#666666',
  background: '#FFFFFF',
  backgroundLight: '#F8F9FA',
  border: '#E1E4E8',
  success: '#4CAF50',
  error: '#F44336',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#9E9E9E',
  lightGray: '#E0E0E0',
};

export const darkColors = {
  primary: '#6CB4EE',
  primaryLight: '#A7D1F4',
  secondary: '#FF9A8B',
  secondaryLight: '#FFD0C8',
  text: '#FFFFFF',
  textLight: '#B0B0B0',
  background: '#1A1A1A',
  backgroundLight: '#2D2D2D',
  border: '#404040',
  success: '#4CAF50',
  error: '#F44336',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#9E9E9E',
  lightGray: '#404040',
};

export const shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    // For web compatibility
    ...(Platform?.OS === 'web' && {
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
    }),
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
    // For web compatibility
    ...(Platform?.OS === 'web' && {
      boxShadow: '0 2px 3.84px rgba(0, 0, 0, 0.15)',
    }),
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5.46,
    elevation: 9,
    // For web compatibility
    ...(Platform?.OS === 'web' && {
      boxShadow: '0 4px 5.46px rgba(0, 0, 0, 0.2)',
    }),
  },
};

export const getColors = (theme: 'light' | 'dark' | undefined) => {
  // Default to light theme if theme is undefined
  const safeTheme = theme || 'light';
  return safeTheme === 'light' ? lightColors : darkColors;
};

// Safe hook for getting colors with theme
export const useColors = () => {
  const { theme } = useTheme();
  return getColors(theme);
};
