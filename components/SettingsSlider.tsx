import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

interface SettingsSliderProps {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
  minimumValue: number;
  maximumValue: number;
  step?: number;
}

export function SettingsSlider({ 
  label, 
  value, 
  onValueChange, 
  minimumValue, 
  maximumValue, 
  step = 0.1 
}: SettingsSliderProps) {
  const percentage = Math.round((value - minimumValue) / (maximumValue - minimumValue) * 100);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{percentage}%</Text>
      </View>
      <Slider
        style={styles.slider}
        value={value}
        onValueChange={onValueChange}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        step={step}
        minimumTrackTintColor="#00ff88"
        maximumTrackTintColor="#444"
        thumbStyle={styles.thumb}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: '#00ff88',
  },
  slider: {
    height: 40,
  },
  thumb: {
    backgroundColor: '#00ff88',
    width: 20,
    height: 20,
  },
});