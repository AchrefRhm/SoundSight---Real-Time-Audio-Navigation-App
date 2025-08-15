import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Mic, MicOff, Volume2, MessageCircle } from 'lucide-react-native';
import { Button } from '@/components/ui/Button';
import { VoiceCommandCard } from '@/components/VoiceCommandCard';

export default function VoiceTab() {
  const [isListening, setIsListening] = useState(false);
  const [lastCommand, setLastCommand] = useState('');
  const [response, setResponse] = useState('');
  const [conversationHistory, setConversationHistory] = useState([]);

  const commonCommands = [
    {
      command: "What's in front of me?",
      description: "Describes objects directly ahead"
    },
    {
      command: "Where is the door?",
      description: "Locates nearest doorway"
    },
    {
      command: "Are there any obstacles?",
      description: "Identifies potential hazards"
    },
    {
      command: "How far is the nearest person?",
      description: "Distance to closest person"
    },
    {
      command: "Find the stairs",
      description: "Locates stairways up or down"
    },
    {
      command: "What's on my left?",
      description: "Describes objects to the left"
    },
  ];

  const simulateVoiceCommand = (command: string) => {
    const responses = {
      "What's in front of me?": "There's a person about 2.5 meters ahead on your left, and a door 1.8 meters to your front-right.",
      "Where is the door?": "I detect a door 1.8 meters to your front-right. Walk forward and turn slightly right.",
      "Are there any obstacles?": "Clear path ahead. There are stairs 4.2 meters directly in front of you.",
      "How far is the nearest person?": "The nearest person is 2.5 meters away, slightly to your left.",
      "Find the stairs": "Stairs detected 4.2 meters directly ahead. Approach carefully.",
      "What's on my left?": "A person is standing 2.5 meters to your front-left."
    };

    return responses[command] || "I'm analyzing your surroundings. Please wait a moment.";
  };

  const handleVoiceCommand = (command: string) => {
    setLastCommand(command);
    const mockResponse = simulateVoiceCommand(command);
    setResponse(mockResponse);
    
    setConversationHistory(prev => [
      ...prev,
      { type: 'user', text: command, timestamp: new Date() },
      { type: 'assistant', text: mockResponse, timestamp: new Date() }
    ]);
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    
    if (!isListening) {
      // Simulate voice recognition
      setTimeout(() => {
        const randomCommands = [
          "What's in front of me?",
          "Where is the door?",
          "Are there any obstacles?"
        ];
        const randomCommand = randomCommands[Math.floor(Math.random() * randomCommands.length)];
        handleVoiceCommand(randomCommand);
        setIsListening(false);
      }, 3000);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <MessageCircle size={32} color="#00ff88" strokeWidth={2} />
        <Text style={styles.headerTitle}>Voice Assistant</Text>
        <Text style={styles.headerSubtitle}>Ask about your surroundings</Text>
      </View>

      <View style={styles.listeningSection}>
        <TouchableOpacity
          style={[styles.micButton, isListening && styles.micButtonActive]}
          onPress={toggleListening}
        >
          {isListening ? (
            <MicOff size={48} color="#1a1a1a" strokeWidth={2} />
          ) : (
            <Mic size={48} color="#fff" strokeWidth={2} />
          )}
        </TouchableOpacity>
        
        <Text style={styles.listeningText}>
          {isListening ? 'Listening...' : 'Tap to speak'}
        </Text>
        
        {lastCommand && (
          <View style={styles.lastCommandContainer}>
            <Text style={styles.lastCommandLabel}>You asked:</Text>
            <Text style={styles.lastCommand}>"{lastCommand}"</Text>
          </View>
        )}
        
        {response && (
          <View style={styles.responseContainer}>
            <Volume2 size={20} color="#00ff88" strokeWidth={2} />
            <Text style={styles.response}>{response}</Text>
          </View>
        )}
      </View>

      <View style={styles.commandsSection}>
        <Text style={styles.sectionTitle}>Quick Commands</Text>
        {commonCommands.map((cmd, index) => (
          <VoiceCommandCard
            key={index}
            command={cmd.command}
            description={cmd.description}
            onPress={() => handleVoiceCommand(cmd.command)}
          />
        ))}
      </View>

      {conversationHistory.length > 0 && (
        <View style={styles.historySection}>
          <Text style={styles.sectionTitle}>Recent Conversation</Text>
          {conversationHistory.slice(-6).map((item, index) => (
            <View
              key={index}
              style={[
                styles.historyItem,
                item.type === 'user' ? styles.userMessage : styles.assistantMessage
              ]}
            >
              <Text style={[
                styles.historyText,
                item.type === 'user' ? styles.userText : styles.assistantText
              ]}>
                {item.text}
              </Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    marginTop: 16,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
  },
  listeningSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  micButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 4,
    borderColor: '#00ff88',
  },
  micButtonActive: {
    backgroundColor: '#00ff88',
    borderColor: '#00cc66',
  },
  listeningText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 20,
  },
  lastCommandContainer: {
    backgroundColor: '#2a2a2a',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    width: '100%',
  },
  lastCommandLabel: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 4,
  },
  lastCommand: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  responseContainer: {
    backgroundColor: '#0f3d2a',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    borderLeftWidth: 4,
    borderLeftColor: '#00ff88',
  },
  response: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 12,
    flex: 1,
    lineHeight: 24,
  },
  commandsSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 16,
  },
  historySection: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  historyItem: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  userMessage: {
    backgroundColor: '#2a2a2a',
    alignSelf: 'flex-end',
    maxWidth: '80%',
  },
  assistantMessage: {
    backgroundColor: '#0f3d2a',
    alignSelf: 'flex-start',
    maxWidth: '80%',
    borderLeftWidth: 3,
    borderLeftColor: '#00ff88',
  },
  historyText: {
    fontSize: 14,
    lineHeight: 20,
  },
  userText: {
    color: '#fff',
  },
  assistantText: {
    color: '#fff',
  },
});