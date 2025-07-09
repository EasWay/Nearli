import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import { useBusinesses } from '@/hooks/use-businesses';
import { SearchBar } from '@/components/SearchBar';
import { BusinessCard } from '@/components/BusinessCard';
import { CategoryList } from '@/components/CategoryList';
import { getColors } from '@/constants/colors';
import { useTheme } from '@/hooks/use-theme-store';
import { Filter } from 'lucide-react-native';

export default function SearchScreen() {
  const { theme } = useTheme();
  const colors = getColors(theme);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'distance' | 'rating'>('distance');
  const { businesses, loading } = useBusinesses(selectedCategory || undefined, searchQuery);
  const [sortedBusinesses, setSortedBusinesses] = useState(businesses);

  useEffect(() => {
    let sorted = [...businesses];
    if (sortBy === 'rating') {
      sorted.sort((a, b) => b.rating - a.rating);
    } else {
      sorted.sort((a, b) => (a.distance || 0) - (b.distance || 0));
    }
    setSortedBusinesses(sorted);
  }, [businesses, sortBy]);

  const toggleSortBy = () => {
    setSortBy(sortBy === 'distance' ? 'rating' : 'distance');
  };

  const renderHeader = () => (
    <>
      <View style={styles.searchContainer}>
        <SearchBar 
          value={searchQuery} 
          onChangeText={setSearchQuery} 
          placeholder="Search by name, description, features..."
        />
        <TouchableOpacity 
          style={[styles.filterButton, { backgroundColor: colors.background }]}
          onPress={toggleSortBy}
        >
          <Filter size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>
      
      <CategoryList 
        selectedCategory={selectedCategory} 
        onSelectCategory={setSelectedCategory} 
      />
      
      <View style={styles.resultsHeader}>
        <Text style={[styles.resultsText, { color: colors.text }]}>
          {loading ? 'Searching...' : `${sortedBusinesses.length} results`}
        </Text>
        <Text style={[styles.sortText, { color: colors.primary }]}>
          Sorted by: {sortBy === 'distance' ? 'Distance' : 'Rating'}
        </Text>
      </View>
    </>
  );

  const renderEmptyState = () => {
    if (loading) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      );
    }
    
    return (
      <View style={styles.emptyContainer}>
        <Text style={[styles.emptyTitle, { color: colors.text }]}>No results found</Text>
        <Text style={[styles.emptyText, { color: colors.textLight }]}>
          Try adjusting your search or category filters
        </Text>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundLight,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingRight: 16,
    },
    filterButton: {
      padding: 12,
      borderRadius: 12,
      marginLeft: 8,
    },
    listContent: {
      padding: 16,
      paddingTop: 8,
    },
    resultsHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 16,
    },
    resultsText: {
      fontSize: 14,
      fontWeight: '500',
    },
    sortText: {
      fontSize: 14,
    },
    emptyContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 40,
      marginTop: 40,
    },
    emptyTitle: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 8,
    },
    emptyText: {
      fontSize: 14,
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={sortedBusinesses}
        renderItem={({ item }) => <BusinessCard business={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
      />
    </View>
  );
}