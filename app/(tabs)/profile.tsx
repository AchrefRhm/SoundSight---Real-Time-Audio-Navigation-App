import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { User, Award, Clock, MapPin, Settings, HelpCircle, Star } from 'lucide-react-native';
import { Button } from '@/components/ui/Button';
import { ProfileStats } from '@/components/ProfileStats';
import { AchievementCard } from '@/components/AchievementCard';

export default function ProfileTab() {
  const userStats = {
    totalDistance: 142.5,
    sessionsCompleted: 28,
    placesExplored: 15,
    achievementsUnlocked: 8
  };

  const achievements = [
    {
      title: "First Steps",
      description: "Completed your first navigation session",
      icon: "footprints",
      unlocked: true,
      date: "2 weeks ago"
    },
    {
      title: "Explorer",
      description: "Visited 10 different locations",
      icon: "map",
      unlocked: true,
      date: "1 week ago"
    },
    {
      title: "Voice Master",
      description: "Used 50 voice commands successfully",
      icon: "mic",
      unlocked: true,
      date: "3 days ago"
    },
    {
      title: "Distance Walker",
      description: "Walk 100km with SoundSight guidance",
      icon: "route",
      unlocked: false,
      progress: 0.85
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileAvatar}>
          <User size={48} color="#00ff88" strokeWidth={2} />
        </View>
        <Text style={styles.profileName}>Achref Rhouma</Text>
        <Text style={styles.profileTitle}>SoundSight Navigator</Text>
        <View style={styles.levelContainer}>
          <Star size={16} color="#ffd700" strokeWidth={2} />
          <Text style={styles.levelText}>Level 7</Text>
        </View>
      </View>

      <ProfileStats stats={userStats} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        <View style={styles.achievementsContainer}>
          {achievements.map((achievement, index) => (
            <AchievementCard key={index} achievement={achievement} />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        
        <View style={styles.activityCard}>
          <View style={styles.activityHeader}>
            <MapPin size={20} color="#00ff88" strokeWidth={2} />
            <Text style={styles.activityTitle}>Navigation to Café</Text>
            <Text style={styles.activityTime}>2 hours ago</Text>
          </View>
          <Text style={styles.activityDescription}>
            Successfully navigated to the university café with 6 voice commands
          </Text>
        </View>

        <View style={styles.activityCard}>
          <View style={styles.activityHeader}>
            <Clock size={20} color="#00ff88" strokeWidth={2} />
            <Text style={styles.activityTitle}>Practice Session</Text>
            <Text style={styles.activityTime}>1 day ago</Text>
          </View>
          <Text style={styles.activityDescription}>
            Completed 15-minute object detection practice in the library
          </Text>
        </View>

        <View style={styles.activityCard}>
          <View style={styles.activityHeader}>
            <Award size={20} color="#ffd700" strokeWidth={2} />
            <Text style={styles.activityTitle}>Achievement Unlocked</Text>
            <Text style={styles.activityTime}>3 days ago</Text>
          </View>
          <Text style={styles.activityDescription}>
            Earned "Voice Master" achievement for 50 successful voice commands
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        
        <TouchableOpacity style={styles.quickActionCard}>
          <Settings size={24} color="#00ff88" strokeWidth={2} />
          <View style={styles.quickActionContent}>
            <Text style={styles.quickActionTitle}>Customize Settings</Text>
            <Text style={styles.quickActionDescription}>Adjust audio, detection, and accessibility preferences</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.quickActionCard}>
          <HelpCircle size={24} color="#00ff88" strokeWidth={2} />
          <View style={styles.quickActionContent}>
            <Text style={styles.quickActionTitle}>Help & Tutorials</Text>
            <Text style={styles.quickActionDescription}>Learn how to use SoundSight effectively</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.aboutSection}>
        <Text style={styles.aboutTitle}>About SoundSight</Text>
        <Text style={styles.aboutText}>
          SoundSight v1.0.0 - Created by Achref Rhouma
        </Text>
        <Text style={styles.aboutDescription}>
          Empowering visually impaired users with AI-powered spatial audio navigation and real-time object recognition.
        </Text>
        
        <View style={styles.supportContainer}>
          <Button
            title="Report Issue"
            onPress={() => {}}
            style={styles.supportButton}
          />
          <Button
            title="Rate App"
            onPress={() => {}}
            style={styles.rateButton}
          />
        </View>
      </View>
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
  profileAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#2a2a2a',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#00ff88',
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  profileTitle: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 12,
  },
  levelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  levelText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffd700',
    marginLeft: 6,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 16,
  },
  achievementsContainer: {
    gap: 12,
  },
  activityCard: {
    backgroundColor: '#2a2a2a',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 12,
    flex: 1,
  },
  activityTime: {
    fontSize: 12,
    color: '#ccc',
  },
  activityDescription: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
  },
  quickActionCard: {
    backgroundColor: '#2a2a2a',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickActionContent: {
    marginLeft: 16,
    flex: 1,
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  quickActionDescription: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
  },
  aboutSection: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
  },
  aboutText: {
    fontSize: 16,
    color: '#00ff88',
    fontWeight: '600',
    marginBottom: 8,
  },
  aboutDescription: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  supportContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  supportButton: {
    backgroundColor: '#444',
    flex: 1,
  },
  rateButton: {
    backgroundColor: '#00ff88',
    flex: 1,
  },
});