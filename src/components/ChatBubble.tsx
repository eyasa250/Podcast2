import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';

const ChatBubble = () => {
  const [visible, setVisible] = useState(true); // État pour afficher ou non la bulle
  const slideAnim = useRef(new Animated.Value(50)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    React.useCallback(() => {
      slideAnim.setValue(50);
      opacityAnim.setValue(0);

      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
      ]).start();

      return () => {
        // Optionnel : reset ou nettoyage
      };
    }, [])
  );

  if (!visible) return null; // Ne rien afficher si visible = false

  return (
    <Animated.View
      style={[
        styles.chatBox,
        {
          opacity: opacityAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <View style={styles.header}>
        <View style={styles.botInfo}>
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={18}
            color="white"
            style={styles.botIcon}
          />
          <Text style={styles.botName}>Bot</Text>
          <View style={styles.greenDot} />
          <Text style={styles.time}>11:00</Text>
        </View>
        <TouchableOpacity onPress={() => setVisible(false)}>
          <Ionicons name="close" size={18} color="#666" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => router.push('/(tabs)/account/ChatScreen')}>
        <Text style={styles.message}>
          Hi! Do you want to learn more about pricing?
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default ChatBubble;

const styles = StyleSheet.create({
  chatBox: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    backgroundColor: '#fff',
    width: 260,
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  botInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  botIcon: {
    backgroundColor: '#4B3DFE',
    padding: 4,
    borderRadius: 12,
    marginRight: 6,
  },
  botName: {
    fontWeight: 'bold',
    marginRight: 4,
  },
  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'green',
    marginRight: 4,
  },
  time: {
    color: '#888',
    fontSize: 12,
  },
  message: {
    marginTop: 8,
    fontSize: 14,
    color: '#333',
  },
});
