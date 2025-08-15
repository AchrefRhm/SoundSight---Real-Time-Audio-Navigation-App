import { View, Text, StyleSheet } from 'react-native';

interface DetectedObject {
  id: number;
  type: string;
  confidence: number;
  position: { x: number; y: number };
  distance: number;
  direction: string;
}

interface ObjectDetectionProps {
  objects: DetectedObject[];
}

export function ObjectDetection({ objects }: ObjectDetectionProps) {
  const getObjectColor = (type: string) => {
    const colors = {
      person: '#ff6b6b',
      door: '#4ecdc4',
      stairs: '#ffe66d',
      vehicle: '#ff8b94',
      obstacle: '#95e1d3',
    };
    return colors[type] || '#fff';
  };

  const getObjectIcon = (type: string) => {
    const icons = {
      person: '👤',
      door: '🚪',
      stairs: '📶',
      vehicle: '🚗',
      obstacle: '⚠️',
    };
    return icons[type] || '📍';
  };

  return (
    <View style={styles.container}>
      {objects.map((object) => (
        <View key={object.id} style={styles.detectionOverlay}>
          <View
            style={[
              styles.boundingBox,
              {
                left: `${object.position.x * 100}%`,
                top: `${object.position.y * 100}%`,
                borderColor: getObjectColor(object.type),
              },
            ]}
          >
            <View style={[styles.label, { backgroundColor: getObjectColor(object.type) }]}>
              <Text style={styles.labelText}>
                {getObjectIcon(object.type)} {object.type}
              </Text>
              <Text style={styles.confidenceText}>
                {Math.round(object.confidence * 100)}%
              </Text>
            </View>
            <View style={styles.distanceIndicator}>
              <Text style={styles.distanceText}>{object.distance.toFixed(1)}m</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  detectionOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  boundingBox: {
    position: 'absolute',
    width: 120,
    height: 80,
    borderWidth: 2,
    borderRadius: 8,
    marginLeft: -60,
    marginTop: -40,
  },
  label: {
    position: 'absolute',
    top: -25,
    left: 0,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelText: {
    color: '#1a1a1a',
    fontSize: 12,
    fontWeight: '600',
    marginRight: 6,
  },
  confidenceText: {
    color: '#1a1a1a',
    fontSize: 10,
    fontWeight: '500',
  },
  distanceIndicator: {
    position: 'absolute',
    bottom: -20,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  distanceText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
});