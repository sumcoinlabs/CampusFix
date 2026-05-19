import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function HeaderBrand() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.icon}>
        <Text style={styles.check}>✓</Text>
      </View>
      <Text style={styles.text}>CampusFix</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  icon: {
    width: 26,
    height: 26,
    borderRadius: 8,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  check: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '900',
    marginTop: -1,
  },
  text: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '900',
  },
});
