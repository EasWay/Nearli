import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList
} from 'react-native';
import { useFavoritesStore } from '@/hooks/use-favorites-store';
import { businesses } from '@/mocks/businesses';
import { BusinessCard } from '@/components/BusinessCard';
import { getColors } from '@/constants/colors';
import { useTheme } from '@/hooks/use-theme-store';
import { Heart } from 'lucide-react-native';

export default function FavoritesScreen() {
  const { theme } = useTheme();
  const colors = getColors(theme);
  const { favorites } = useFavoritesStore();
  
  const favoriteBusinesses = businesses.filter(business => 
    favorites.includes(business.id)
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={[styles.emptyIconContainer, { backgroundColor: colors.secondaryLight }]}>
        <Heart size={40} color={colors.secondary} />
      </View>
      <Text style={[styles.emptyTitle, { color: colors.text }]}>No favorites yet</Text>
      <Text style={[styles.emptyText, { color: colors.textLight }]}>
        Save your favorite businesses to access them quickly
      </Text>
    </View>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundLight,
    },
    listContent: {
      padding: 16,
      paddingBottom: 40,
      flexGrow: 1,
    },
    header: {
      fontSize: 20,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 16,
    },
    emptyContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 40,
      marginTop: 100,
    },
    emptyIconContainer: {
      width: 80,
      height: 80,
      borderRadius: 40,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
    emptyTitle: {
      fontSize: 20,
      fontWeight: '600',
      marginBottom: 8,
    },
    emptyText: {
      fontSize: 16,
      textAlign: 'center',
      lineHeight: 22,
    },
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteBusinesses}
        renderItem={({ item }) => <BusinessCard business={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          favorites.length > 0 ? (
            <Text style={styles.header}>Your Favorite Businesses</Text>
          ) : null
        }
        ListEmptyComponent={renderEmptyState}
      />
    </View>
  );
}