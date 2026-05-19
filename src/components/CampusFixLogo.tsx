import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  compact?: boolean;
};

export function CampusFixLogo({ compact = false }: Props) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.icon}>
        <View style={styles.checkCircle}>
          <Text style={styles.check}>✓</Text>
        </View>
        <View style={styles.barTall} />
        <View style={styles.barShort} />
      </View>

      {!compact ? (
        <View>
          <Text style={styles.name}>CampusFix</Text>
          <Text style={styles.tagline}>Facilities workflow demo</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  icon: {
    width: 76,
    height: 76,
    borderRadius: 22,
    backgroundColor: '#0f172a',
    position: 'relative',
    overflow: 'hidden',
  },
  checkCircle: {
    position: 'absolute',
    left: 10,
    top: 14,
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  check: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: '900',
    marginTop: -2,
  },
  barTall: {
    position: 'absolute',
    right: 22,
    bottom: 14,
    width: 13,
    height: 46,
    borderRadius: 6,
    backgroundColor: '#93c5fd',
  },
  barShort: {
    position: 'absolute',
    right: 6,
    bottom: 14,
    width: 13,
    height: 30,
    borderRadius: 6,
    backgroundColor: '#22c55e',
  },
  name: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: '900',
  },
  tagline: {
    color: '#93c5fd',
    fontSize: 14,
    fontWeight: '800',
    marginTop: 2,
  },
});
