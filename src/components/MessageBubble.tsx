// components/MessageBubble.tsx
import React from 'react';
import { View, Text } from 'react-native';

interface Props {
  message: {
    text: string;
    sender: 'user' | 'bot';
  };
}

const MessageBubble = ({ message }: Props) => {
  const isUser = message.sender === 'user';

  return (
    <View
      style={{
        alignSelf: isUser ? 'flex-end' : 'flex-start',
        backgroundColor: isUser ? '#007aff' : '#eee',
        borderRadius: 16,
        marginBottom: 10,
        padding: 10,
        maxWidth: '75%',
      }}
    >
      <Text style={{ color: isUser ? '#fff' : '#000' }}>{message.text}</Text>
    </View>
  );
};

export default MessageBubble;
