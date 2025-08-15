import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Mic } from 'lucide-react-native';

interface VoiceCommandCardProps {
  command: string;
  description: string;
  onPress: () => void;
}

export function VoiceCommandCard({ command, description, onPress }: VoiceCommandCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Mic size={20} color="#00ff88" strokeWidth={2} />
      </View>
      <View style={styles.content}>
        <Text style={styles.command}>"{command}"</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={styles.arrow}>
        <Text style={styles.arrowText}>▶</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#2a2a2a',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#00ff88',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1a3d2a',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  command: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 18,
  },
  arrow: {
    width: 24,
    alignItems: 'center',
  },
  arrowText: {
    color: '#00ff88',
    fontSize: 12,
  },
});