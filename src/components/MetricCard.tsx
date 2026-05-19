import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  label: string;
  value: string | number;
  helper?: string;
};

export function MetricCard({ label, value, helper }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
      {helper ? <Text style={styles.helper}>{helper}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  value: {
    fontSize: 26,
    fontWeight: '900',
    color: '#2563eb',
  },
  label: {
    marginTop: 4,
    color: '#111827',
    fontWeight: '900',
    fontSize: 13,
  },
  helper: {
    marginTop: 5,
    color: '#64748b',
    fontSize: 12,
    lineHeight: 17,
  },
});
