import React, { useState } from 'react';
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import MessageBubble from '@/components/MessageBubble';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

const ChatScreen = () => {
const [messages, setMessages] = useState<Message[]>([]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('http://192.168.11.40:3001/chatbot/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: input }),
      });

      const json = await response.json();

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: json.response || 'Désolé, je n\'ai pas compris.',
        sender: 'bot',
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Erreur lors de la connexion au serveur.",
        sender: 'bot',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#fff' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
    >
      <FlatList
        data={messages}
        renderItem={({ item }) => <MessageBubble message={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16 }}
      />

      {loading && <ActivityIndicator size="small" color="#007aff" style={{ marginBottom: 10 }} />}

      <View
        style={{
          flexDirection: 'row',
          padding: 8,
          borderTopWidth: 1,
          borderColor: '#eee',
          backgroundColor: '#fafafa',
          paddingBottom: 80,
        }}
      >
        <TextInput
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 20,
            paddingHorizontal: 15,
            paddingVertical: 8,
            backgroundColor: '#fff',
          }}
          placeholder="Écrire un message..."
          value={input}
          onChangeText={setInput}
          editable={!loading}
        />
        <TouchableOpacity
          onPress={handleSend}
          style={{ marginLeft: 8, justifyContent: 'center' }}
          disabled={loading}
        >
          <Text style={{ color: '#007aff', fontWeight: 'bold' }}>Envoyer</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
