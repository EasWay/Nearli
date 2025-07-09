import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Switch
} from 'react-native';
import { 
  User, 
  Settings, 
  Bell, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  MapPin,
  Shield,
  Star,
  Moon,
  Sun
} from 'lucide-react-native';
import { getColors } from '@/constants/colors';
import { useTheme } from '@/hooks/use-theme-store';

export default function ProfileScreen() {
  const { theme, toggleTheme } = useTheme();
  const colors = getColors(theme);
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  
  const toggleNotifications = () => {
    setNotificationsEnabled(previousState => !previousState);
  };

  const renderMenuItem = (
    icon: React.ReactNode,
    title: string,
    subtitle?: string,
    rightElement?: React.ReactNode
  ) => (
    <TouchableOpacity style={[styles.menuItem, { backgroundColor: colors.background }]}>
      <View style={[styles.menuIconContainer, { backgroundColor: colors.backgroundLight }]}>{icon}</View>
      <View style={styles.menuTextContainer}>
        <Text style={[styles.menuTitle, { color: colors.text }]}>{title}</Text>
        {subtitle && <Text style={[styles.menuSubtitle, { color: colors.textLight }]}>{subtitle}</Text>}
      </View>
      {rightElement || <ChevronRight size={20} color={colors.textLight} />}
    </TouchableOpacity>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundLight,
    },
    header: {
      backgroundColor: colors.background,
      padding: 20,
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    profileImageContainer: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: colors.primaryLight,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 12,
    },
    profileName: {
      fontSize: 20,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 8,
    },
    editButton: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      backgroundColor: colors.primary,
      borderRadius: 20,
    },
    editButtonText: {
      color: colors.white,
      fontWeight: '500',
      fontSize: 14,
    },
    section: {
      backgroundColor: colors.background,
      marginTop: 16,
      paddingVertical: 8,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: colors.border,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginHorizontal: 16,
      marginVertical: 12,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    menuIconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    menuTextContainer: {
      flex: 1,
    },
    menuTitle: {
      fontSize: 16,
      fontWeight: '500',
    },
    menuSubtitle: {
      fontSize: 14,
      marginTop: 2,
    },
    logoutButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.background,
      marginTop: 16,
      paddingVertical: 16,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: colors.border,
    },
    logoutText: {
      color: colors.error,
      fontWeight: '600',
      fontSize: 16,
      marginLeft: 8,
    },
    versionText: {
      textAlign: 'center',
      color: colors.textLight,
      fontSize: 12,
      marginTop: 16,
      marginBottom: 40,
    },
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          <User size={40} color={colors.primary} />
        </View>
        <Text style={styles.profileName}>Guest User</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Sign In / Register</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        
        {renderMenuItem(
          theme === 'dark' ? <Moon size={22} color={colors.primary} /> : <Sun size={22} color={colors.primary} />,
          'Theme',
          `Currently using ${theme} mode`,
          <Switch
            value={theme === 'dark'}
            onValueChange={toggleTheme}
            trackColor={{ false: colors.lightGray, true: colors.primaryLight }}
            thumbColor={theme === 'dark' ? colors.primary : colors.gray}
          />
        )}
        
        {renderMenuItem(
          <Bell size={22} color={colors.primary} />,
          'Notifications',
          'Get updates about new businesses',
          <Switch
            value={notificationsEnabled}
            onValueChange={toggleNotifications}
            trackColor={{ false: colors.lightGray, true: colors.primaryLight }}
            thumbColor={notificationsEnabled ? colors.primary : colors.gray}
          />
        )}
        
        {renderMenuItem(
          <MapPin size={22} color={colors.primary} />,
          'Location',
          'Manage location permissions'
        )}
        
        {renderMenuItem(
          <Settings size={22} color={colors.primary} />,
          'App Settings',
          'Language, currency, and more'
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        
        {renderMenuItem(
          <HelpCircle size={22} color={colors.primary} />,
          'Help Center',
          'FAQs and support resources'
        )}
        
        {renderMenuItem(
          <Shield size={22} color={colors.primary} />,
          'Privacy Policy',
          'How we handle your data'
        )}
        
        {renderMenuItem(
          <Star size={22} color={colors.primary} />,
          'Rate the App',
          'Tell us what you think'
        )}
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <LogOut size={20} color={colors.error} />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      <Text style={styles.versionText}>Version 1.0.0 - Made in Ghana 🇬🇭</Text>
    </ScrollView>
  );
}