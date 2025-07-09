import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Phone, Mail, Globe, MessageSquare } from 'lucide-react-native';
import { getColors } from '@/constants/colors';
import { useTheme } from '@/hooks/use-theme-store';

interface ContactButtonsProps {
  phone: string;
  email: string;
  website?: string;
  onMessage: () => void;
}

export const ContactButtons = ({ phone, email, website, onMessage }: ContactButtonsProps) => {
  const { theme } = useTheme();
  const colors = getColors(theme);

  const handleCall = () => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleEmail = () => {
    Linking.openURL(`mailto:${email}`);
  };

  const handleWebsite = () => {
    if (website) {
      Linking.openURL(website.startsWith('http') ? website : `https://${website}`);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 16,
      gap: 10,
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      borderRadius: 12,
      flex: 1,
    },
    primaryButton: {
      backgroundColor: colors.primary,
    },
    secondaryButton: {
      backgroundColor: colors.background,
      borderWidth: 1,
      borderColor: colors.primary,
    },
    primaryButtonText: {
      color: colors.white,
      fontWeight: '600',
      marginLeft: 8,
    },
    secondaryButtonText: {
      color: colors.primary,
      fontWeight: '600',
      marginLeft: 8,
    },
    smallButtonsContainer: {
      flexDirection: 'row',
      gap: 8,
    },
    smallButton: {
      backgroundColor: colors.backgroundLight,
      padding: 12,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.button, styles.primaryButton]} 
        onPress={handleCall}
      >
        <Phone size={20} color={colors.white} />
        <Text style={styles.primaryButtonText}>Call</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.button, styles.secondaryButton]} 
        onPress={onMessage}
      >
        <MessageSquare size={20} color={colors.primary} />
        <Text style={styles.secondaryButtonText}>Message</Text>
      </TouchableOpacity>
      
      <View style={styles.smallButtonsContainer}>
        <TouchableOpacity 
          style={styles.smallButton} 
          onPress={handleEmail}
        >
          <Mail size={20} color={colors.textLight} />
        </TouchableOpacity>
        
        {website && (
          <TouchableOpacity 
            style={styles.smallButton} 
            onPress={handleWebsite}
          >
            <Globe size={20} color={colors.textLight} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};