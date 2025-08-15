import { View, Text, StyleSheet } from 'react-native';
import { Route, Award, MapPin, Clock } from 'lucide-react-native';

interface ProfileStatsProps {
  stats: {
    totalDistance: number;
    sessionsCompleted: number;
    placesExplored: number;
    achievementsUnlocked: number;
  };
}

export function ProfileStats({ stats }: ProfileStatsProps) {
  const statItems = [
    {
      icon: Route,
      label: 'Distance',
      value: `${stats.totalDistance}km`,
      color: '#00ff88',
    },
    {
      icon: Clock,
      label: 'Sessions',
      value: stats.sessionsCompleted.toString(),
      color: '#4ecdc4',
    },
    {
      icon: MapPin,
      label: 'Places',
      value: stats.placesExplored.toString(),
      color: '#ffe66d',
    },
    {
      icon: Award,
      label: 'Achievements',
      value: stats.achievementsUnlocked.toString(),
      color: '#ff8b94',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.statsGrid}>
        {statItems.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <View key={index} style={styles.statCard}>
              <View style={[styles.iconContainer, { backgroundColor: `${stat.color}20` }]}>
                <Icon size={24} color={stat.color} strokeWidth={2} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#2a2a2a',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#ccc',
    textAlign: 'center',
  },
});