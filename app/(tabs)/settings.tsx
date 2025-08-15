import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import { Settings as SettingsIcon, Volume2, Eye, Zap, Shield } from 'lucide-react-native';
import { SettingsSection } from '@/components/SettingsSection';
import { SettingsSlider } from '@/components/SettingsSlider';

export default function SettingsTab() {
  const [audioSettings, setAudioSettings] = useState({
    masterVolume: 0.8,
    spatialAudioIntensity: 0.7,
    voiceGuidanceVolume: 0.9,
    alertVolume: 0.6,
    hapticFeedback: true,
  });

  const [detectionSettings, setDetectionSettings] = useState({
    objectDetection: true,
    personDetection: true,
    vehicleDetection: true,
    obstacleDetection: true,
    textRecognition: false,
    confidenceThreshold: 0.7,
  });

  const [accessibilitySettings, setAccessibilitySettings] = useState({
    highContrastMode: false,
    largeText: true,
    voiceAnnouncements: true,
    screenReader: false,
    slowSpeech: false,
  });

  const updateAudioSetting = (key: string, value: number | boolean) => {
    setAudioSettings(prev => ({ ...prev, [key]: value }));
  };

  const updateDetectionSetting = (key: string, value: number | boolean) => {
    setDetectionSettings(prev => ({ ...prev, [key]: value }));
  };

  const updateAccessibilitySetting = (key: string, value: boolean) => {
    setAccessibilitySettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <SettingsIcon size={32} color="#00ff88" strokeWidth={2} />
        <Text style={styles.headerTitle}>Settings</Text>
        <Text style={styles.headerSubtitle}>Customize your SoundSight experience</Text>
      </View>

      <SettingsSection title="Audio Settings" icon={Volume2}>
        <SettingsSlider
          label="Master Volume"
          value={audioSettings.masterVolume}
          onValueChange={(value) => updateAudioSetting('masterVolume', value)}
          minimumValue={0}
          maximumValue={1}
        />
        
        <SettingsSlider
          label="Spatial Audio Intensity"
          value={audioSettings.spatialAudioIntensity}
          onValueChange={(value) => updateAudioSetting('spatialAudioIntensity', value)}
          minimumValue={0}
          maximumValue={1}
        />
        
        <SettingsSlider
          label="Voice Guidance Volume"
          value={audioSettings.voiceGuidanceVolume}
          onValueChange={(value) => updateAudioSetting('voiceGuidanceVolume', value)}
          minimumValue={0}
          maximumValue={1}
        />
        
        <SettingsSlider
          label="Alert Volume"
          value={audioSettings.alertVolume}
          onValueChange={(value) => updateAudioSetting('alertVolume', value)}
          minimumValue={0}
          maximumValue={1}
        />

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Haptic Feedback</Text>
          <Switch
            value={audioSettings.hapticFeedback}
            onValueChange={(value) => updateAudioSetting('hapticFeedback', value)}
            trackColor={{ false: '#333', true: '#00ff88' }}
            thumbColor={audioSettings.hapticFeedback ? '#fff' : '#ccc'}
          />
        </View>
      </SettingsSection>

      <SettingsSection title="Detection Settings" icon={Zap}>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Object Detection</Text>
          <Switch
            value={detectionSettings.objectDetection}
            onValueChange={(value) => updateDetectionSetting('objectDetection', value)}
            trackColor={{ false: '#333', true: '#00ff88' }}
            thumbColor={detectionSettings.objectDetection ? '#fff' : '#ccc'}
          />
        </View>

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Person Detection</Text>
          <Switch
            value={detectionSettings.personDetection}
            onValueChange={(value) => updateDetectionSetting('personDetection', value)}
            trackColor={{ false: '#333', true: '#00ff88' }}
            thumbColor={detectionSettings.personDetection ? '#fff' : '#ccc'}
          />
        </View>

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Vehicle Detection</Text>
          <Switch
            value={detectionSettings.vehicleDetection}
            onValueChange={(value) => updateDetectionSetting('vehicleDetection', value)}
            trackColor={{ false: '#333', true: '#00ff88' }}
            thumbColor={detectionSettings.vehicleDetection ? '#fff' : '#ccc'}
          />
        </View>

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Text Recognition</Text>
          <Switch
            value={detectionSettings.textRecognition}
            onValueChange={(value) => updateDetectionSetting('textRecognition', value)}
            trackColor={{ false: '#333', true: '#00ff88' }}
            thumbColor={detectionSettings.textRecognition ? '#fff' : '#ccc'}
          />
        </View>

        <SettingsSlider
          label="Detection Confidence"
          value={detectionSettings.confidenceThreshold}
          onValueChange={(value) => updateDetectionSetting('confidenceThreshold', value)}
          minimumValue={0.1}
          maximumValue={1}
        />
      </SettingsSection>

      <SettingsSection title="Accessibility" icon={Eye}>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>High Contrast Mode</Text>
          <Switch
            value={accessibilitySettings.highContrastMode}
            onValueChange={(value) => updateAccessibilitySetting('highContrastMode', value)}
            trackColor={{ false: '#333', true: '#00ff88' }}
            thumbColor={accessibilitySettings.highContrastMode ? '#fff' : '#ccc'}
          />
        </View>

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Large Text</Text>
          <Switch
            value={accessibilitySettings.largeText}
            onValueChange={(value) => updateAccessibilitySetting('largeText', value)}
            trackColor={{ false: '#333', true: '#00ff88' }}
            thumbColor={accessibilitySettings.largeText ? '#fff' : '#ccc'}
          />
        </View>

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Voice Announcements</Text>
          <Switch
            value={accessibilitySettings.voiceAnnouncements}
            onValueChange={(value) => updateAccessibilitySetting('voiceAnnouncements', value)}
            trackColor={{ false: '#333', true: '#00ff88' }}
            thumbColor={accessibilitySettings.voiceAnnouncements ? '#fff' : '#ccc'}
          />
        </View>

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Screen Reader Support</Text>
          <Switch
            value={accessibilitySettings.screenReader}
            onValueChange={(value) => updateAccessibilitySetting('screenReader', value)}
            trackColor={{ false: '#333', true: '#00ff88' }}
            thumbColor={accessibilitySettings.screenReader ? '#fff' : '#ccc'}
          />
        </View>
      </SettingsSection>

      <SettingsSection title="Privacy & Security" icon={Shield}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Local Processing</Text>
          <Text style={styles.infoText}>
            All AI processing happens locally on your device. No data is sent to external servers.
          </Text>
        </View>
        
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Data Storage</Text>
          <Text style={styles.infoText}>
            Audio recordings and navigation history are stored locally and can be deleted at any time.
          </Text>
        </View>
      </SettingsSection>
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
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  switchLabel: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
    flex: 1,
  },
  infoCard: {
    backgroundColor: '#2a2a2a',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#00ff88',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
  },
});