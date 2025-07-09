import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { X, Send } from 'lucide-react-native';
import { getColors } from '@/constants/colors';
import { useTheme } from '@/hooks/use-theme-store';

interface MessageModalProps {
  visible: boolean;
  onClose: () => void;
  businessName: string;
}

export const MessageModal = ({ visible, onClose, businessName }: MessageModalProps) => {
  const { theme } = useTheme();
  const colors = getColors(theme);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const handleSend = () => {
    if (!message.trim()) return;
    
    setSending(true);
    
    // Simulate sending message
    setTimeout(() => {
      setSending(false);
      setMessage('');
      onClose();
      // In a real app, you would send the message to an API here
    }, 1000);
  };

  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
      backgroundColor: colors.background,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
      maxHeight: '80%',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
    },
    closeButton: {
      padding: 4,
    },
    messageContainer: {
      maxHeight: 200,
    },
    messageInput: {
      backgroundColor: colors.backgroundLight,
      borderRadius: 12,
      padding: 16,
      fontSize: 16,
      color: colors.text,
      minHeight: 120,
      textAlignVertical: 'top',
    },
    sendButton: {
      backgroundColor: colors.primary,
      borderRadius: 12,
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 16,
    },
    sendButtonDisabled: {
      backgroundColor: colors.lightGray,
    },
    sendingButton: {
      backgroundColor: colors.primaryLight,
    },
    sendButtonText: {
      color: colors.white,
      fontWeight: '600',
      fontSize: 16,
      marginLeft: 8,
    },
  });

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalContainer}
      >
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Message to {businessName}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.messageContainer}>
            <TextInput
              style={styles.messageInput}
              placeholder="Type your message here..."
              placeholderTextColor={colors.textLight}
              multiline
              value={message}
              onChangeText={setMessage}
              autoFocus
            />
          </ScrollView>
          
          <TouchableOpacity
            style={[
              styles.sendButton,
              !message.trim() ? styles.sendButtonDisabled : null,
              sending ? styles.sendingButton : null
            ]}
            onPress={handleSend}
            disabled={!message.trim() || sending}
          >
            <Send size={20} color={colors.white} />
            <Text style={styles.sendButtonText}>
              {sending ? 'Sending...' : 'Send Message'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};