import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Star } from 'lucide-react-native';
import { BusinessReview } from '@/types/business';
import { getColors } from '@/constants/colors';
import { useTheme } from '@/hooks/use-theme-store';

interface ReviewItemProps {
  review: BusinessReview;
}

function getImageSource(img: any) {
  if (typeof img === 'string') {
    return { uri: img };
  }
  return img;
}

export const ReviewItem = ({ review }: ReviewItemProps) => {
  const { theme } = useTheme();
  const colors = getColors(theme);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 12,
    },
    userInfo: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 12,
    },
    avatarPlaceholder: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.primaryLight,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    avatarInitial: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.primary,
    },
    userName: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
    date: {
      fontSize: 12,
      color: colors.textLight,
      marginTop: 2,
    },
    ratingContainer: {
      flexDirection: 'row',
    },
    star: {
      marginLeft: 2,
    },
    comment: {
      fontSize: 14,
      color: colors.text,
      lineHeight: 20,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          {review.userAvatar ? (
            <Image 
              source={getImageSource(review.userAvatar)} 
              style={styles.avatar} 
            />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarInitial}>
                {review.userName.charAt(0)}
              </Text>
            </View>
          )}
          <View>
            <Text style={styles.userName}>{review.userName}</Text>
            <Text style={styles.date}>{formatDate(review.date)}</Text>
          </View>
        </View>
        <View style={styles.ratingContainer}>
          {Array(5).fill(0).map((_, i) => (
            <Star 
              key={i} 
              size={16} 
              color={colors.primary} 
              fill={i < review.rating ? colors.primary : 'none'} 
              style={styles.star}
            />
          ))}
        </View>
      </View>
      <Text style={styles.comment}>{review.comment}</Text>
    </View>
  );
};