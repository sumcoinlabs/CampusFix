import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAppState } from '../context/AppStateContext';

type Props = {
  title: string;
  subtitle?: string;
};

export function PageBrand({ title, subtitle }: Props) {
  const { currentUser } = useAppState();

  if (!currentUser) {
    return null;
  }

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.icon}>
          <Text style={styles.check}>✓</Text>
        </View>
        <View style={styles.textWrap}>
          <Text style={styles.appName}>CampusFix</Text>
          <Text style={styles.role}>
            {currentUser.role === 'staff' ? 'Staff Admin Workspace' : 'Resident Workspace'}
          </Text>
        </View>
      </View>

      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#0f172a',
    borderRadius: 22,
    padding: 18,
    marginBottom: 18,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  icon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  check: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '900',
    marginTop: -2,
  },
  textWrap: {
    flex: 1,
  },
  appName: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '900',
  },
  role: {
    color: '#93c5fd',
    fontWeight: '800',
    marginTop: 2,
  },
  title: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: '900',
  },
  subtitle: {
    color: '#cbd5e1',
    marginTop: 6,
    lineHeight: 21,
    fontWeight: '600',
  },
});
