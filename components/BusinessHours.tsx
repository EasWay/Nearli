import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BusinessHours as BusinessHoursType } from '@/types/business';
import { getColors } from '@/constants/colors';
import { useTheme } from '@/hooks/use-theme-store';

interface BusinessHoursProps {
  hours: BusinessHoursType[];
}

export const BusinessHours = ({ hours }: BusinessHoursProps) => {
  const { theme } = useTheme();
  const colors = getColors(theme);
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  const styles = StyleSheet.create({
    container: {
      marginTop: 16,
      backgroundColor: colors.background,
      borderRadius: 12,
      padding: 16,
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 12,
    },
    hourRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: colors.backgroundLight,
    },
    todayRow: {
      backgroundColor: colors.primaryLight + '30',
      borderRadius: 8,
      paddingHorizontal: 8,
      borderBottomWidth: 0,
    },
    day: {
      fontSize: 14,
      color: colors.textLight,
    },
    time: {
      fontSize: 14,
      color: colors.text,
    },
    todayText: {
      fontWeight: '600',
      color: colors.primary,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Business Hours</Text>
      {hours.map((hour, index) => (
        <View 
          key={index} 
          style={[
            styles.hourRow, 
            hour.day === today ? styles.todayRow : null
          ]}
        >
          <Text 
            style={[
              styles.day, 
              hour.day === today ? styles.todayText : null
            ]}
          >
            {hour.day}
          </Text>
          <Text 
            style={[
              styles.time, 
              hour.day === today ? styles.todayText : null
            ]}
          >
            {hour.isClosed ? 'Closed' : `${hour.open} - ${hour.close}`}
          </Text>
        </View>
      ))}
    </View>
  );
};