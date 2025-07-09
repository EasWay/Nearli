import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  ActivityIndicator,
  RefreshControl,
  Image,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { useBusinesses } from '@/hooks/use-businesses';
import { useLocation } from '@/hooks/use-location';
import { BusinessCard } from '@/components/BusinessCard';
import { CategoryList } from '@/components/CategoryList';
import { SearchBar } from '@/components/SearchBar';
import { getColors } from '@/constants/colors';
import { useTheme } from '@/hooks/use-theme-store';
import { MapPin } from 'lucide-react-native';
import { categories } from '@/constants/categories';
import { Business } from '@/types/business';

function getImageSource(img: any) {
  if (typeof img === 'string') {
    return { uri: img };
  }
  return img;
}

export default function DiscoverScreen() {
  const { theme } = useTheme();
  const colors = getColors(theme);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const location = useLocation();
  const { businesses, loading } = useBusinesses(selectedCategory || undefined, searchQuery);
  
  const [featuredBusinesses, setFeaturedBusinesses] = useState<Business[]>([]);

  useEffect(() => {
    if (businesses.length > 0) {
      // Get top rated businesses for featured section
      const featured = [...businesses]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 5);
      setFeaturedBusinesses(featured);
    }
  }, [businesses]);

  const onRefresh = () => {
    setRefreshing(true);
    // In a real app, you would refresh the data here
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const renderLocationInfo = () => {
    if (location.loading) {
      return <Text style={[styles.locationText, { color: colors.textLight }]}>Finding your location...</Text>;
    }
    
    if (location.error) {
      return <Text style={[styles.locationText, { color: colors.textLight }]}>Location unavailable</Text>;
    }
    
    return <Text style={[styles.locationText, { color: colors.textLight }]}>Nearby businesses in Accra</Text>;
  };

  const renderFeaturedItem = ({ item }: { item: Business }) => (
    <TouchableOpacity 
      style={styles.featuredItem}
      onPress={() => {}}
    >
      <Image 
        source={getImageSource(item.images[0])} 
        style={styles.featuredImage}
      />
      <View style={styles.featuredOverlay}>
        <Text style={styles.featuredName}>{item.name}</Text>
        <View style={[styles.featuredRating, { backgroundColor: colors.primary }]}>
          <Text style={styles.featuredRatingText}>{item.rating.toFixed(1)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : categoryId;
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundLight,
    },
    header: {
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 8,
    },
    locationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    locationText: {
      fontSize: 14,
      marginLeft: 4,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
      marginTop: 8,
    },
    featuredSection: {
      marginTop: 16,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      marginHorizontal: 16,
      marginBottom: 12,
    },
    featuredList: {
      paddingHorizontal: 16,
      paddingBottom: 8,
    },
    featuredItem: {
      width: 200,
      height: 150,
      borderRadius: 12,
      marginRight: 12,
      overflow: 'hidden',
    },
    featuredImage: {
      width: '100%',
      height: '100%',
    },
    featuredOverlay: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.4)',
      padding: 12,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    featuredName: {
      color: colors.white,
      fontWeight: '600',
      fontSize: 14,
      flex: 1,
    },
    featuredRating: {
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 4,
    },
    featuredRatingText: {
      color: colors.white,
      fontWeight: '600',
      fontSize: 12,
    },
    businessesContainer: {
      padding: 16,
      paddingTop: 8,
    },
    businessList: {
      marginTop: 8,
    },
    loader: {
      marginTop: 40,
    },
    emptyState: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 40,
      padding: 20,
    },
    emptyStateText: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 8,
    },
    emptyStateSubtext: {
      fontSize: 14,
      color: colors.textLight,
      textAlign: 'center',
    },
  });

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <MapPin size={16} color={colors.primary} />
          {renderLocationInfo()}
        </View>
        <Text style={styles.title}>Find Local Businesses</Text>
      </View>

      <SearchBar 
        value={searchQuery} 
        onChangeText={setSearchQuery} 
      />

      <CategoryList 
        selectedCategory={selectedCategory} 
        onSelectCategory={setSelectedCategory} 
      />

      {featuredBusinesses.length > 0 && (
        <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>Featured Businesses</Text>
          <FlatList
            horizontal
            data={featuredBusinesses}
            renderItem={renderFeaturedItem}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredList}
          />
        </View>
      )}

      <View style={styles.businessesContainer}>
        {selectedCategory && (
          <Text style={styles.sectionTitle}>
            {getCategoryName(selectedCategory)}
          </Text>
        )}
        
        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />
        ) : businesses.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No businesses found</Text>
            <Text style={styles.emptyStateSubtext}>
              Try changing your search or category
            </Text>
          </View>
        ) : (
          <View style={styles.businessList}>
            {businesses.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}