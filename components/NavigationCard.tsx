import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { MapPin, Clock } from 'lucide-react-native';

interface NavigationCardProps {
  name: string;
  time: string;
  onPress: () => void;
}

export function NavigationCard({ name, time, onPress }: NavigationCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.iconContainer}>
        <MapPin size={20} color="#00ff88" strokeWidth={2} />
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.timeContainer}>
          <Clock size={12} color="#ccc" strokeWidth={2} />
          <Text style={styles.time}>{time}</Text>
        </View>
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
    width: '48%',
    minHeight: 80,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1a3d2a',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 6,
    lineHeight: 18,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    fontSize: 12,
    color: '#ccc',
    marginLeft: 4,
  },
});