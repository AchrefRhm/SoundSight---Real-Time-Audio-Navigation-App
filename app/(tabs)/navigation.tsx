import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Navigation, MapPin, Route, Compass, ArrowRight } from 'lucide-react-native';
import { Button } from '@/components/ui/Button';
import { NavigationCard } from '@/components/NavigationCard';

export default function NavigationTab() {
  const [isNavigating, setIsNavigating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [destination, setDestination] = useState('');

  const navigationSteps = [
    {
      instruction: "Walk straight for 15 meters",
      distance: "15m",
      direction: "straight",
      hazards: []
    },
    {
      instruction: "Turn right at the door",
      distance: "2m",
      direction: "right",
      hazards: ["door frame"]
    },
    {
      instruction: "Walk straight for 8 meters",
      distance: "8m", 
      direction: "straight",
      hazards: ["person ahead"]
    },
    {
      instruction: "Turn left at the end of the hallway",
      distance: "1m",
      direction: "left",
      hazards: []
    },
    {
      instruction: "Walk straight for 5 meters",
      distance: "5m",
      direction: "straight",
      hazards: []
    },
    {
      instruction: "You have arrived at your destination",
      distance: "0m",
      direction: "arrived",
      hazards: []
    }
  ];

  const quickDestinations = [
    { name: "Nearest Exit", icon: "exit", time: "2 min" },
    { name: "Restroom", icon: "restroom", time: "1 min" },
    { name: "Elevator", icon: "elevator", time: "3 min" },
    { name: "Information Desk", icon: "info", time: "4 min" },
    { name: "Café", icon: "cafe", time: "5 min" },
    { name: "Main Entrance", icon: "entrance", time: "6 min" }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isNavigating && currentStep < navigationSteps.length - 1) {
      interval = setInterval(() => {
        setCurrentStep(prev => prev + 1);
      }, 4000);
    } else if (currentStep >= navigationSteps.length - 1) {
      setIsNavigating(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isNavigating, currentStep]);

  const startNavigation = (dest: string) => {
    setDestination(dest);
    setCurrentStep(0);
    setIsNavigating(true);
  };

  const stopNavigation = () => {
    setIsNavigating(false);
    setCurrentStep(0);
    setDestination('');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Navigation size={32} color="#00ff88" strokeWidth={2} />
        <Text style={styles.headerTitle}>Navigation</Text>
        <Text style={styles.headerSubtitle}>Step-by-step guidance</Text>
      </View>

      {isNavigating ? (
        <View style={styles.activeNavigationSection}>
          <View style={styles.destinationHeader}>
            <MapPin size={20} color="#00ff88" strokeWidth={2} />
            <Text style={styles.destinationText}>Going to {destination}</Text>
          </View>

          <View style={styles.currentStepCard}>
            <View style={styles.stepHeader}>
              <Text style={styles.stepNumber}>Step {currentStep + 1}</Text>
              <Text style={styles.stepDistance}>{navigationSteps[currentStep].distance}</Text>
            </View>
            
            <Text style={styles.stepInstruction}>
              {navigationSteps[currentStep].instruction}
            </Text>

            {navigationSteps[currentStep].hazards.length > 0 && (
              <View style={styles.hazardAlert}>
                <Text style={styles.hazardText}>
                  ⚠️ {navigationSteps[currentStep].hazards.join(', ')}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill,
                  { width: `${((currentStep + 1) / navigationSteps.length) * 100}%` }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
              {currentStep + 1} of {navigationSteps.length} steps
            </Text>
          </View>

          <Button
            title="Stop Navigation"
            onPress={stopNavigation}
            style={styles.stopButton}
          />

          <View style={styles.upcomingSteps}>
            <Text style={styles.upcomingTitle}>Next Steps:</Text>
            {navigationSteps.slice(currentStep + 1, currentStep + 3).map((step, index) => (
              <View key={index} style={styles.upcomingStep}>
                <ArrowRight size={16} color="#666" strokeWidth={2} />
                <Text style={styles.upcomingStepText}>{step.instruction}</Text>
              </View>
            ))}
          </View>
        </View>
      ) : (
        <View style={styles.destinationSection}>
          <Text style={styles.sectionTitle}>Quick Destinations</Text>
          
          <View style={styles.destinationsGrid}>
            {quickDestinations.map((dest, index) => (
              <NavigationCard
                key={index}
                name={dest.name}
                time={dest.time}
                onPress={() => startNavigation(dest.name)}
              />
            ))}
          </View>

          <View style={styles.customDestination}>
            <Text style={styles.customTitle}>Custom Destination</Text>
            <Button
              title="Set Custom Location"
              onPress={() => startNavigation("Custom Location")}
              style={styles.customButton}
            />
          </View>
        </View>
      )}

      <View style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>Navigation Features</Text>
        
        <View style={styles.featureCard}>
          <Compass size={24} color="#00ff88" strokeWidth={2} />
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>3D Spatial Audio</Text>
            <Text style={styles.featureDescription}>
              Directional sound cues guide you with precise positioning
            </Text>
          </View>
        </View>

        <View style={styles.featureCard}>
          <Route size={24} color="#00ff88" strokeWidth={2} />
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Dynamic Route Updates</Text>
            <Text style={styles.featureDescription}>
              Real-time path adjustments based on obstacles and conditions
            </Text>
          </View>
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
  activeNavigationSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  destinationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  destinationText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 8,
  },
  currentStepCard: {
    backgroundColor: '#2a2a2a',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#00ff88',
  },
  stepHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#00ff88',
  },
  stepDistance: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ccc',
  },
  stepInstruction: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    lineHeight: 26,
  },
  hazardAlert: {
    backgroundColor: '#4a2a1a',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#ff8800',
  },
  hazardText: {
    fontSize: 14,
    color: '#ffaa44',
    fontWeight: '500',
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#333',
    borderRadius: 3,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#00ff88',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'center',
  },
  stopButton: {
    backgroundColor: '#ff4444',
    marginBottom: 20,
  },
  upcomingSteps: {
    backgroundColor: '#2a2a2a',
    padding: 16,
    borderRadius: 12,
  },
  upcomingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
  },
  upcomingStep: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  upcomingStepText: {
    fontSize: 14,
    color: '#ccc',
    marginLeft: 8,
    flex: 1,
  },
  destinationSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 16,
  },
  destinationsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 30,
  },
  customDestination: {
    backgroundColor: '#2a2a2a',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 30,
  },
  customTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16,
  },
  customButton: {
    backgroundColor: '#444',
    borderWidth: 2,
    borderColor: '#00ff88',
  },
  featuresSection: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  featureCard: {
    backgroundColor: '#2a2a2a',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureContent: {
    marginLeft: 16,
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
  },
});