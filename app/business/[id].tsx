import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  Dimensions,
  FlatList,
  Linking,
  Platform,
  Share
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { businesses } from '@/mocks/businesses';
import { Business } from '@/types/business';
import { getColors, shadows } from '@/constants/colors';
import { useTheme } from '@/hooks/use-theme-store';
import { 
  Heart, 
  Star, 
  MapPin, 
  Clock, 
  Share2
} from 'lucide-react-native';
import { useFavoritesStore } from '@/hooks/use-favorites-store';
import { BusinessHours } from '@/components/BusinessHours';
import { ContactButtons } from '@/components/ContactButtons';
import { ReviewItem } from '@/components/ReviewItem';
import { MessageModal } from '@/components/MessageModal';

const { width } = Dimensions.get('window');

function getImageSource(img: any) {
  if (typeof img === 'string') {
    return { uri: img };
  }
  return img;
}

export default function BusinessDetailScreen() {
  const { theme } = useTheme();
  const colors = getColors(theme);
  const { id } = useLocalSearchParams<{ id: string }>();
  const [business, setBusiness] = useState<Business | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [messageModalVisible, setMessageModalVisible] = useState(false);
  
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();
  
  useEffect(() => {
    if (id) {
      const foundBusiness = businesses.find(b => b.id === id);
      if (foundBusiness) {
        setBusiness(foundBusiness);
      }
    }
  }, [id]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundLight,
    },
    loadingContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    imageContainer: {
      position: 'relative',
      height: 250,
      width: '100%',
    },
    image: {
      width,
      height: 250,
    },
    pagination: {
      position: 'absolute',
      bottom: 16,
      alignSelf: 'center',
      flexDirection: 'row',
    },
    paginationDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      marginHorizontal: 4,
    },
    paginationDotActive: {
      backgroundColor: colors.white,
    },
    imageActions: {
      position: 'absolute',
      bottom: 16,
      right: 16,
      flexDirection: 'row',
    },
    actionButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 8,
    },
    contentContainer: {
      backgroundColor: colors.backgroundLight,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      marginTop: -20,
      paddingHorizontal: 16,
      paddingTop: 20,
      paddingBottom: 40,
    },
    header: {
      marginBottom: 12,
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 8,
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    rating: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginLeft: 4,
    },
    reviewCount: {
      fontSize: 14,
      color: colors.textLight,
      marginLeft: 4,
    },
    description: {
      fontSize: 16,
      color: colors.text,
      lineHeight: 24,
      marginBottom: 16,
    },
    infoContainer: {
      backgroundColor: colors.background,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      ...shadows.small,
    },
    infoItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    infoText: {
      fontSize: 14,
      color: colors.text,
      marginLeft: 12,
      flex: 1,
    },
    featuresContainer: {
      backgroundColor: colors.background,
      borderRadius: 12,
      padding: 16,
      marginTop: 16,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 12,
    },
    featuresList: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    featureItem: {
      backgroundColor: colors.backgroundLight,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
    },
    featureText: {
      fontSize: 14,
      color: colors.text,
    },
    reviewsContainer: {
      marginTop: 16,
    },
    reviewsHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    seeAllText: {
      fontSize: 14,
      color: colors.primary,
      fontWeight: '500',
    },
    mapButton: {
      backgroundColor: colors.primary,
      borderRadius: 12,
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 24,
    },
    mapButtonText: {
      color: colors.white,
      fontWeight: '600',
      fontSize: 16,
      marginLeft: 8,
    },
  });

  if (!business) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.backgroundLight }]}>
        <Text style={{ color: colors.text }}>Loading...</Text>
      </View>
    );
  }

  const favorite = isFavorite(business.id);

  const toggleFavorite = () => {
    if (favorite) {
      removeFavorite(business.id);
    } else {
      addFavorite(business.id);
    }
  };

  const handleShare = async () => {
    try {
      if (Platform.OS === 'web') {
        alert('Sharing is not available on web');
        return;
      }
      
      await Share.share({
        title: business.name,
        message: `Check out ${business.name} on Local Business Finder!`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const openMap = () => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${business.latitude},${business.longitude}`;
    const label = business.name;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
      web: `https://maps.google.com/?q=${latLng}`,
    });

    if (url) {
      Linking.openURL(url);
    }
  };

  const renderImageItem = ({ item, index }: { item: any; index: number }) => (
    <Image 
      source={getImageSource(item)} 
      style={styles.image} 
      resizeMode="cover"
    />
  );

  const renderImagePagination = () => (
    <View style={styles.pagination}>
      {business.images.map((_, index) => (
        <View
          key={index}
          style={[
            styles.paginationDot,
            index === activeImageIndex ? styles.paginationDotActive : null,
          ]}
        />
      ))}
    </View>
  );

  const onImageScroll = (event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = Math.floor(event.nativeEvent.contentOffset.x / slideSize);
    if (index !== activeImageIndex) {
      setActiveImageIndex(index);
    }
  };

  const toggleShowAllReviews = () => {
    setShowAllReviews(!showAllReviews);
  };

  const visibleReviews = showAllReviews 
    ? business.reviews 
    : business.reviews?.slice(0, 2);

  const formatDistance = (distance?: number) => {
    if (!distance) return 'Distance unavailable';
    if (distance < 1000) {
      return `${distance}m away`;
    }
    return `${(distance / 1000).toFixed(1)}km away`;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <FlatList
          data={business.images}
          renderItem={renderImageItem}
          keyExtractor={(item, index) => `image-${index}`}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onImageScroll}
          scrollEventThrottle={16}
        />
        {renderImagePagination()}
        
        <View style={styles.imageActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={toggleFavorite}
          >
            <Heart 
              size={22} 
              color={favorite ? colors.secondary : colors.white}
              fill={favorite ? colors.secondary : 'none'}
            />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleShare}
          >
            <Share2 size={22} color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.name}>{business.name}</Text>
          <View style={styles.ratingContainer}>
            <Star size={16} color={colors.primary} fill={colors.primary} />
            <Text style={styles.rating}>{business.rating.toFixed(1)}</Text>
            <Text style={styles.reviewCount}>({business.reviewCount})</Text>
          </View>
        </View>
        
        <Text style={styles.description}>{business.description}</Text>
        
        <View style={styles.infoContainer}>
          <TouchableOpacity style={styles.infoItem} onPress={openMap}>
            <MapPin size={20} color={colors.primary} />
            <Text style={styles.infoText}>{business.address}</Text>
          </TouchableOpacity>
          
          <View style={styles.infoItem}>
            <Clock size={20} color={colors.primary} />
            <Text style={styles.infoText}>
              {formatDistance(business.distance)}
            </Text>
          </View>
        </View>
        
        <ContactButtons 
          phone={business.phone}
          email={business.email}
          website={business.website}
          onMessage={() => setMessageModalVisible(true)}
        />
        
        <View style={styles.featuresContainer}>
          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.featuresList}>
            {business.features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        </View>
        
        <BusinessHours hours={business.hours} />
        
        {business.reviews && business.reviews.length > 0 && (
          <View style={styles.reviewsContainer}>
            <View style={styles.reviewsHeader}>
              <Text style={styles.sectionTitle}>Reviews</Text>
              {business.reviews.length > 2 && (
                <TouchableOpacity onPress={toggleShowAllReviews}>
                  <Text style={styles.seeAllText}>
                    {showAllReviews ? 'Show Less' : 'See All'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            
            {visibleReviews?.map((review) => (
              <ReviewItem key={review.id} review={review} />
            ))}
          </View>
        )}
        
        <TouchableOpacity 
          style={styles.mapButton}
          onPress={openMap}
        >
          <MapPin size={20} color={colors.white} />
          <Text style={styles.mapButtonText}>View on Map</Text>
        </TouchableOpacity>
      </View>
      
      <MessageModal 
        visible={messageModalVisible}
        onClose={() => setMessageModalVisible(false)}
        businessName={business.name}
      />
    </ScrollView>
  );
}