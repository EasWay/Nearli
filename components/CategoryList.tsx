import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { categories } from '@/constants/categories';
import { getColors } from '@/constants/colors';
import { useTheme } from '@/hooks/use-theme-store';
import { Coffee, ShoppingBag, Utensils, Heart, Scissors, Dumbbell, Briefcase, Film } from 'lucide-react-native';

interface CategoryListProps {
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export const CategoryList = ({ selectedCategory, onSelectCategory }: CategoryListProps) => {
  const { theme } = useTheme();
  const colors = getColors(theme);

  const getIcon = (iconName: string, isSelected: boolean) => {
    const iconColor = isSelected ? colors.white : colors.primary;
    const size = 20;

    switch (iconName) {
      case 'coffee':
        return <Coffee size={size} color={iconColor} />;
      case 'shopping-bag':
        return <ShoppingBag size={size} color={iconColor} />;
      case 'utensils':
        return <Utensils size={size} color={iconColor} />;
      case 'heart':
        return <Heart size={size} color={iconColor} />;
      case 'scissors':
        return <Scissors size={size} color={iconColor} />;
      case 'dumbbell':
        return <Dumbbell size={size} color={iconColor} />;
      case 'briefcase':
        return <Briefcase size={size} color={iconColor} />;
      case 'film':
        return <Film size={size} color={iconColor} />;
      default:
        return <Briefcase size={size} color={iconColor} />;
    }
  };

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      gap: 10,
    },
    categoryItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      backgroundColor: colors.backgroundLight,
      marginRight: 8,
    },
    selectedCategory: {
      backgroundColor: colors.primary,
    },
    categoryText: {
      fontSize: 14,
      fontWeight: '500',
      color: colors.text,
      marginLeft: 6,
    },
    selectedCategoryText: {
      color: colors.white,
    },
  });

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <TouchableOpacity
        style={[
          styles.categoryItem,
          !selectedCategory ? styles.selectedCategory : null,
        ]}
        onPress={() => onSelectCategory(null)}
      >
        <Text
          style={[
            styles.categoryText,
            !selectedCategory ? styles.selectedCategoryText : null,
          ]}
        >
          All
        </Text>
      </TouchableOpacity>

      {categories.map((category) => {
        const isSelected = selectedCategory === category.id;
        return (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryItem,
              isSelected ? styles.selectedCategory : null,
            ]}
            onPress={() => onSelectCategory(category.id)}
          >
            {getIcon(category.icon, isSelected)}
            <Text
              style={[
                styles.categoryText,
                isSelected ? styles.selectedCategoryText : null,
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};