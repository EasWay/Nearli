import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Heart, Star, MapPin } from 'lucide-react-native';
import { Business } from '@/types/business';
import { getColors, shadows } from '@/constants/colors';
import { useTheme } from '@/hooks/use-theme-store';
import { useFavoritesStore } from '@/hooks/use-favorites-store';

interface BusinessCardProps {
  business: Business;
  compact?: boolean;
}

function getImageSource(img: any) {
  if (typeof img === 'string') {
    return { uri: img };
  }
  return img;
}

export const BusinessCard = ({ business, compact = false }: BusinessCardProps) => {
  const { theme } = useTheme();
  const colors = getColors(theme);
  const router = useRouter();
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();
  const favorite = isFavorite(business.id);

  const handlePress = () => {
    router.push(`/business/${business.id}`);
  };

  const toggleFavorite = (e: any) => {
    e.stopPropagation();
    if (favorite) {
      removeFavorite(business.id);
    } else {
      addFavorite(business.id);
    }
  };

  const renderPriceLevel = () => {
    return Array(business.priceLevel)
      .fill('₵')
      .join('');
  };

  const formatDistance = (distance?: number) => {
    if (!distance) return 'Distance unavailable';
    if (distance < 1000) {
      return `${distance}m`;
    }
    return `${(distance / 1000).toFixed(1)}km`;
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      borderRadius: 12,
      marginBottom: 16,
      overflow: 'hidden',
      width: '100%',
      ...shadows.medium,
    },
    compactContainer: {
      flexDirection: 'row',
      height: 100,
    },
    image: {
      height: 180,
      width: '100%',
    },
    compactImage: {
      height: '100%',
      width: 100,
    },
    favoriteButton: {
      position: 'absolute',
      top: 8,
      right: 8,
      backgroundColor: 'rgba(0,0,0,0.3)',
      borderRadius: 24,
      padding: 12,
    },
    content: {
      padding: 12,
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 6,
    },
    name: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      flex: 1,
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.backgroundLight,
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 4,
    },
    rating: {
      fontSize: 12,
      fontWeight: '600',
      color: colors.primary,
      marginLeft: 2,
    },
    description: {
      fontSize: 14,
      color: colors.textLight,
      marginBottom: 8,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    infoItem: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    infoText: {
      fontSize: 12,
      color: colors.textLight,
      marginLeft: 4,
    },
    priceLevel: {
      fontSize: 12,
      color: colors.textLight,
      fontWeight: '500',
    },
    categoryText: {
      fontSize: 12,
      color: colors.textLight,
      marginLeft: 4,
    },
  });

  return (
    <TouchableOpacity
      style={[styles.container, compact ? styles.compactContainer : null]}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <Image
        source={getImageSource(business.images[0])}
        style={compact ? styles.compactImage : styles.image}
      />
      
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={toggleFavorite}
      >
        <Heart
          size={22}
          color={favorite ? colors.secondary : colors.white}
          fill={favorite ? colors.secondary : 'none'}
        />
      </TouchableOpacity>
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={1}>{business.name}</Text>
          <View style={styles.ratingContainer}>
            <Star size={14} color={colors.primary} fill={colors.primary} />
            <Text style={styles.rating}>{business.rating.toFixed(1)}</Text>
          </View>
        </View>
        
        {!compact && (
          <Text style={styles.description} numberOfLines={2}>
            {business.description}
          </Text>
        )}
        
        <View style={styles.footer}>
          <View style={styles.infoItem}>
            <MapPin size={14} color={colors.textLight} />
            <Text style={styles.infoText} numberOfLines={1}>
              {formatDistance(business.distance)}
            </Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.priceLevel}>{renderPriceLevel()}</Text>
            <Text style={styles.categoryText}>• {business.categoryId}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};