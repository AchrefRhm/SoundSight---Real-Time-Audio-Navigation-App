import { View, Text, StyleSheet } from 'react-native';
import { Award, Lock, CircleCheck as CheckCircle } from 'lucide-react-native';

interface Achievement {
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  date?: string;
  progress?: number;
}

interface AchievementCardProps {
  achievement: Achievement;
}

export function AchievementCard({ achievement }: AchievementCardProps) {
  const getIcon = () => {
    if (achievement.unlocked) {
      return <CheckCircle size={24} color="#00ff88" strokeWidth={2} />;
    } else {
      return <Lock size={24} color="#666" strokeWidth={2} />;
    }
  };

  return (
    <View style={[styles.card, !achievement.unlocked && styles.lockedCard]}>
      <View style={styles.iconContainer}>
        {getIcon()}
      </View>
      
      <View style={styles.content}>
        <Text style={[styles.title, !achievement.unlocked && styles.lockedText]}>
          {achievement.title}
        </Text>
        <Text style={[styles.description, !achievement.unlocked && styles.lockedText]}>
          {achievement.description}
        </Text>
        
        {achievement.unlocked && achievement.date && (
          <Text style={styles.date}>Unlocked {achievement.date}</Text>
        )}
        
        {!achievement.unlocked && achievement.progress !== undefined && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill,
                  { width: `${achievement.progress * 100}%` }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
              {Math.round(achievement.progress * 100)}% complete
            </Text>
          </View>
        )}
      </View>
      
      <View style={styles.badgeContainer}>
        <Award size={20} color={achievement.unlocked ? "#ffd700" : "#333"} strokeWidth={2} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#2a2a2a',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 3,
    borderLeftColor: '#00ff88',
  },
  lockedCard: {
    backgroundColor: '#1a1a1a',
    borderLeftColor: '#333',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 18,
    marginBottom: 8,
  },
  lockedText: {
    color: '#666',
  },
  date: {
    fontSize: 12,
    color: '#00ff88',
    fontWeight: '500',
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#333',
    borderRadius: 2,
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#00ff88',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: '#ccc',
  },
  badgeContainer: {
    marginLeft: 12,
  },
});