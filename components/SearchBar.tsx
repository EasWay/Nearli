import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Search, X } from 'lucide-react-native';
import { getColors, shadows } from '@/constants/colors';
import { useTheme } from '@/hooks/use-theme-store';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const SearchBar = ({
  value,
  onChangeText,
  placeholder = 'Search businesses...',
}: SearchBarProps) => {
  const { theme } = useTheme();
  const colors = getColors(theme);

  const handleClear = () => {
    onChangeText('');
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.background,
      borderRadius: 12,
      paddingHorizontal: 12,
      paddingVertical: 10,
      marginHorizontal: 16,
      marginVertical: 8,
      ...shadows.small,
    },
    icon: {
      marginRight: 8,
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: colors.text,
      padding: 0,
    },
    clearButton: {
      padding: 4,
    },
  });

  return (
    <View style={styles.container}>
      <Search size={20} color={colors.textLight} style={styles.icon} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textLight}
        returnKeyType="search"
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
          <X size={18} color={colors.textLight} />
        </TouchableOpacity>
      )}
    </View>
  );
};