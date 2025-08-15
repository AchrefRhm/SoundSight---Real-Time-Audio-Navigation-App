import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useEffect, useState } from 'react';

interface DetectedObject {
  id: number;
  type: string;
  distance: number;
  direction: string;
}

interface SpatialAudioVisualizationProps {
  objects: DetectedObject[];
}

const { width: screenWidth } = Dimensions.get('window');

export function SpatialAudioVisualization({ objects }: SpatialAudioVisualizationProps) {
  const [pulseAnimation, setPulseAnimation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseAnimation(prev => (prev + 1) % 3);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  const getDirectionPosition = (direction: string) => {
    const positions = {
      'front-left': { left: '25%', top: '30%' },
      'front': { left: '50%', top: '20%' },
      'front-right': { left: '75%', top: '30%' },
      'left': { left: '10%', top: '50%' },
      'right': { left: '90%', top: '50%' },
      'back-left': { left: '25%', top: '70%' },
      'back': { left: '50%', top: '80%' },
      'back-right': { left: '75%', top: '70%' },
    };
    return positions[direction] || { left: '50%', top: '50%' };
  };

  const getAudioIntensity = (distance: number) => {
    return Math.max(0.2, 1 - (distance / 10));
  };

  return (
    <View style={styles.container}>
      <View style={styles.compass}>
        <View style={styles.compassCenter}>
          <Text style={styles.compassText}>YOU</Text>
        </View>
        
        {/* Compass directions */}
        <Text style={[styles.directionLabel, styles.north]}>N</Text>
        <Text style={[styles.directionLabel, styles.east]}>E</Text>
        <Text style={[styles.directionLabel, styles.south]}>S</Text>
        <Text style={[styles.directionLabel, styles.west]}>W</Text>
        
        {/* Audio visualization for each detected object */}
        {objects.map((object) => {
          const position = getDirectionPosition(object.direction);
          const intensity = getAudioIntensity(object.distance);
          
          return (
            <View
              key={object.id}
              style={[
                styles.audioIndicator,
                {
                  left: position.left,
                  top: position.top,
                  opacity: intensity,
                  transform: [
                    { scale: 0.8 + (intensity * 0.4) + (pulseAnimation * 0.1) }
                  ],
                },
              ]}
            >
              <View style={[styles.audioWave, { opacity: 0.8 - (pulseAnimation * 0.2) }]} />
              <View style={[styles.audioWave, styles.wave2, { opacity: 0.6 - (pulseAnimation * 0.15) }]} />
              <View style={[styles.audioWave, styles.wave3, { opacity: 0.4 - (pulseAnimation * 0.1) }]} />
              
              <Text style={styles.objectLabel}>{object.type}</Text>
              <Text style={styles.distanceLabel}>{object.distance.toFixed(1)}m</Text>
            </View>
          );
        })}
      </View>
      
      <View style={styles.legend}>
        <Text style={styles.legendTitle}>Spatial Audio Map</Text>
        <Text style={styles.legendText}>
          Objects around you are represented by audio cues positioned in 3D space
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 300,
    backgroundColor: '#0a0a0a',
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  compass: {
    flex: 1,
    position: 'relative',
    margin: 20,
    borderRadius: 150,
    borderWidth: 2,
    borderColor: '#00ff88',
    backgroundColor: 'rgba(0, 255, 136, 0.05)',
  },
  compassCenter: {
    position: 'absolute',
    top: '45%',
    left: '45%',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#00ff88',
    alignItems: 'center',
    justifyContent: 'center',
  },
  compassText: {
    color: '#1a1a1a',
    fontSize: 12,
    fontWeight: '700',
  },
  directionLabel: {
    position: 'absolute',
    color: '#00ff88',
    fontSize: 16,
    fontWeight: '700',
  },
  north: {
    top: 10,
    left: '48%',
  },
  east: {
    right: 15,
    top: '48%',
  },
  south: {
    bottom: 10,
    left: '48%',
  },
  west: {
    left: 15,
    top: '48%',
  },
  audioIndicator: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    marginLeft: -30,
    marginTop: -30,
  },
  audioWave: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#00ff88',
    borderWidth: 2,
    borderColor: '#00ff88',
  },
  wave2: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'transparent',
    marginLeft: -5,
    marginTop: -5,
  },
  wave3: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'transparent',
    marginLeft: -10,
    marginTop: -10,
  },
  objectLabel: {
    position: 'absolute',
    top: -25,
    fontSize: 10,
    fontWeight: '600',
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  distanceLabel: {
    position: 'absolute',
    bottom: -25,
    fontSize: 9,
    color: '#ccc',
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 3,
  },
  legend: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#1a1a1a',
  },
  legendTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#00ff88',
    marginBottom: 4,
  },
  legendText: {
    fontSize: 12,
    color: '#ccc',
    lineHeight: 16,
  },
});