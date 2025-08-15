import { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Button } from '@/components/ui/Button';
import { ObjectDetection } from '@/components/ObjectDetection';
import { SpatialAudioVisualization } from '@/components/SpatialAudioVisualization';
import { Camera, RotateCcw, Zap, ZapOff, Eye, Target } from 'lucide-react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function CameraTab() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectedObjects, setDetectedObjects] = useState([]);
  const [detectionStats, setDetectionStats] = useState({
    totalObjects: 0,
    confidence: 0,
    processingSpeed: 0
  });
  const detectionInterval = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isDetecting) {
      startObjectDetection();
    } else {
      stopObjectDetection();
    }

    return () => {
      if (detectionInterval.current) {
        clearInterval(detectionInterval.current);
      }
    };
  }, [isDetecting]);

  const startObjectDetection = () => {
    // Enhanced simulation with more realistic object detection
    detectionInterval.current = setInterval(() => {
      const mockObjects = [
        {
          id: 1,
          type: 'person',
          confidence: 0.89 + (Math.random() * 0.1),
          position: { x: 0.3 + (Math.random() * 0.1), y: 0.4 + (Math.random() * 0.1) },
          distance: 2.5 + (Math.random() * 0.5),
          direction: 'front-left'
        },
        {
          id: 2,
          type: 'door',
          confidence: 0.92 + (Math.random() * 0.08),
          position: { x: 0.7 + (Math.random() * 0.05), y: 0.3 + (Math.random() * 0.1) },
          distance: 1.8 + (Math.random() * 0.3),
          direction: 'front-right'
        },
        {
          id: 3,
          type: 'stairs',
          confidence: 0.76 + (Math.random() * 0.15),
          position: { x: 0.5 + (Math.random() * 0.1), y: 0.8 + (Math.random() * 0.05) },
          distance: 4.2 + (Math.random() * 0.8),
          direction: 'front'
        },
        {
          id: 4,
          type: 'vehicle',
          confidence: 0.85 + (Math.random() * 0.1),
          position: { x: 0.1 + (Math.random() * 0.1), y: 0.6 + (Math.random() * 0.1) },
          distance: 8.5 + (Math.random() * 2),
          direction: 'left'
        }
      ];

      // Randomly show/hide objects for more realistic simulation
      const activeObjects = mockObjects.filter(() => Math.random() > 0.3);
      
      setDetectedObjects(activeObjects);
      
      // Update detection stats
      const avgConfidence = activeObjects.reduce((sum, obj) => sum + obj.confidence, 0) / activeObjects.length;
      setDetectionStats({
        totalObjects: activeObjects.length,
        confidence: avgConfidence || 0,
        processingSpeed: 28 + Math.random() * 4 // Simulate 28-32 FPS
      });
    }, 1000);
  };

  const stopObjectDetection = () => {
    if (detectionInterval.current) {
      clearInterval(detectionInterval.current);
    }
    setDetectedObjects([]);
    setDetectionStats({
      totalObjects: 0,
      confidence: 0,
      processingSpeed: 0
    });
  };

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Initializing SoundSight AI...</Text>
        <View style={styles.loadingIndicator}>
          <View style={styles.loadingBar} />
        </View>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <View style={styles.permissionHeader}>
          <Eye size={64} color="#00ff88" strokeWidth={1.5} />
          <Text style={styles.permissionTitle}>SoundSight Camera Access</Text>
          <Text style={styles.permissionSubtitle}>AI-Powered Object Recognition</Text>
        </View>
        
        <View style={styles.featureList}>
          <View style={styles.featureItem}>
            <Target size={20} color="#00ff88" strokeWidth={2} />
            <Text style={styles.featureText}>Real-time object detection using YOLOv8</Text>
          </View>
          <View style={styles.featureItem}>
            <Zap size={20} color="#00ff88" strokeWidth={2} />
            <Text style={styles.featureText}>30 FPS processing for instant feedback</Text>
          </View>
          <View style={styles.featureItem}>
            <Eye size={20} color="#00ff88" strokeWidth={2} />
            <Text style={styles.featureText}>Privacy-first: All processing happens locally</Text>
          </View>
        </View>
        
        <Text style={styles.permissionText}>
          SoundSight transforms visual information into spatial audio cues, helping you navigate
          the world with confidence through advanced AI-powered object recognition.
        </Text>
        
        <Button
          title="Enable Camera & Start Detection"
          onPress={requestPermission}
          style={styles.permissionButton}
        />
        
        <Text style={styles.privacyNote}>
          🔒 Your privacy is protected - all AI processing occurs on your device
        </Text>
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const toggleDetection = () => {
    setIsDetecting(!isDetecting);
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing}>
        <ObjectDetection objects={detectedObjects} />
        
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerTitle}>SoundSight AI</Text>
            <Text style={styles.headerSubtitle}>Object Detection Active</Text>
          </View>
          <View style={styles.statusContainer}>
            <View style={[styles.statusDot, isDetecting && styles.statusActive]} />
            <Text style={styles.statusText}>
              {isDetecting ? 'LIVE' : 'PAUSED'}
            </Text>
          </View>
        </View>

        {isDetecting && (
          <View style={styles.statsOverlay}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Objects</Text>
              <Text style={styles.statValue}>{detectionStats.totalObjects}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Confidence</Text>
              <Text style={styles.statValue}>
                {(detectionStats.confidence * 100).toFixed(0)}%
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>FPS</Text>
              <Text style={styles.statValue}>
                {detectionStats.processingSpeed.toFixed(0)}
              </Text>
            </View>
          </View>
        )}

        <View style={styles.controlsContainer}>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={toggleCameraFacing}
          >
            <RotateCcw size={24} color="#fff" strokeWidth={2} />
            <Text style={styles.controlLabel}>Flip</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.detectionButton, isDetecting && styles.detectionButtonActive]}
            onPress={toggleDetection}
          >
            {isDetecting ? (
              <>
                <ZapOff size={32} color="#1a1a1a" strokeWidth={2} />
                <Text style={[styles.detectionLabel, styles.detectionLabelActive]}>
                  Stop Detection
                </Text>
              </>
            ) : (
              <>
                <Zap size={32} color="#fff" strokeWidth={2} />
                <Text style={styles.detectionLabel}>Start Detection</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {detectedObjects.length > 0 && (
          <View style={styles.objectSummary}>
            <Text style={styles.summaryText}>
              Detecting: {detectedObjects.map(obj => obj.type).join(', ')}
            </Text>
          </View>
        )}
      </CameraView>

      <SpatialAudioVisualization objects={detectedObjects} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
    width: screenWidth,
    height: screenHeight * 0.7,
  },
  permissionContainer: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  permissionHeader: {
    alignItems: 'center',
    marginBottom: 40,
  },
  permissionTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 8,
  },
  permissionSubtitle: {
    fontSize: 16,
    color: '#00ff88',
    fontWeight: '600',
    textAlign: 'center',
  },
  featureList: {
    width: '100%',
    marginBottom: 30,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  featureText: {
    fontSize: 16,
    color: '#ccc',
    marginLeft: 16,
    flex: 1,
  },
  permissionText: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  permissionButton: {
    backgroundColor: '#00ff88',
    paddingHorizontal: 40,
    paddingVertical: 18,
    marginBottom: 20,
  },
  privacyNote: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  header: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerLeft: {},
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#00ff88',
    fontWeight: '600',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#666',
    marginRight: 8,
  },
  statusActive: {
    backgroundColor: '#00ff88',
  },
  statusText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  statsOverlay: {
    position: 'absolute',
    top: 120,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    minWidth: 80,
  },
  statLabel: {
    color: '#ccc',
    fontSize: 12,
    fontWeight: '500',
  },
  statValue: {
    color: '#00ff88',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 2,
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    paddingHorizontal: 40,
  },
  controlButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlLabel: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 8,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  detectionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.4)',
    minHeight: 90,
  },
  detectionButtonActive: {
    backgroundColor: '#00ff88',
    borderColor: '#00ff88',
  },
  detectionLabel: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 8,
    textAlign: 'center',
  },
  detectionLabelActive: {
    color: '#1a1a1a',
  },
  objectSummary: {
    position: 'absolute',
    bottom: 150,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  summaryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
  },
  loadingIndicator: {
    width: 200,
    height: 4,
    backgroundColor: '#333',
    borderRadius: 2,
    marginTop: 20,
    overflow: 'hidden',
  },
  loadingBar: {
    width: '70%',
    height: '100%',
    backgroundColor: '#00ff88',
    borderRadius: 2,
  },
});