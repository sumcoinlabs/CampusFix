import React, { useState } from 'react';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAppState } from '../context/AppStateContext';
import { UserRole } from '../types';
import { CampusFixLogo } from '../components/CampusFixLogo';

export default function LoginScreen() {
  const { loginDemo, register } = useAppState();
  const [name, setName] = useState('Demo User');
  const [email, setEmail] = useState('demo@demo.com');
  const [role, setRole] = useState<UserRole>('resident');

  function continueAsDemo(nextRole: UserRole) {
    loginDemo(nextRole);
    router.push('/dashboard' as never);
  }

  function createAccount() {
    register(name, email, role);
    router.push('/dashboard' as never);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.hero}>
        <CampusFixLogo />
        <Text style={styles.tagline}>Functional local workflow demo</Text>
        <Text style={styles.heroText}>
          Create requests, update status, follow duplicates, and persist demo data locally.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Quick Demo Login</Text>

        <Pressable style={styles.primaryButton} onPress={() => continueAsDemo('resident')}>
          <Text style={styles.primaryButtonText}>Continue as Resident</Text>
          <Text style={styles.buttonSubtext}>Report issues and track public updates</Text>
        </Pressable>

        <Pressable style={styles.darkButton} onPress={() => continueAsDemo('staff')}>
          <Text style={styles.primaryButtonText}>Continue as Staff Admin</Text>
          <Text style={styles.buttonSubtext}>Manage queue, notes, and status changes</Text>
        </Pressable>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Create Local Demo Account</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Name" />
        <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" autoCapitalize="none" />

        <View style={styles.roleRow}>
          <Pressable style={[styles.roleChip, role === 'resident' && styles.roleActive]} onPress={() => setRole('resident')}>
            <Text style={[styles.roleText, role === 'resident' && styles.roleTextActive]}>Resident</Text>
          </Pressable>
          <Pressable style={[styles.roleChip, role === 'staff' && styles.roleActive]} onPress={() => setRole('staff')}>
            <Text style={[styles.roleText, role === 'staff' && styles.roleTextActive]}>Staff</Text>
          </Pressable>
        </View>

        <Pressable style={styles.secondaryAction} onPress={createAccount}>
          <Text style={styles.secondaryActionText}>Create Account & Continue</Text>
        </Pressable>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40 },
  hero: { backgroundColor: '#0f172a', borderRadius: 26, padding: 24, marginBottom: 18 },
  logo: { color: '#ffffff', fontSize: 38, fontWeight: '900' },
  tagline: { color: '#93c5fd', fontSize: 18, fontWeight: '900', marginTop: 6 },
  heroText: { color: '#cbd5e1', fontSize: 15, lineHeight: 23, marginTop: 14 },
  card: { backgroundColor: '#ffffff', borderRadius: 24, padding: 18, borderColor: '#e5e7eb', borderWidth: 1, marginBottom: 16 },
  sectionTitle: { fontSize: 22, fontWeight: '900', color: '#111827', marginBottom: 14 },
  primaryButton: { backgroundColor: '#2563eb', borderRadius: 18, padding: 16, marginBottom: 12 },
  darkButton: { backgroundColor: '#0f172a', borderRadius: 18, padding: 16 },
  primaryButtonText: { color: '#ffffff', fontSize: 16, fontWeight: '900' },
  buttonSubtext: { color: '#dbeafe', marginTop: 4, fontWeight: '700' },
  input: { backgroundColor: '#f8fafc', borderColor: '#e5e7eb', borderWidth: 1, borderRadius: 14, padding: 13, fontSize: 15, marginBottom: 10 },
  roleRow: { flexDirection: 'row', gap: 10, marginBottom: 12 },
  roleChip: { flex: 1, borderRadius: 14, padding: 12, backgroundColor: '#f8fafc', borderWidth: 1, borderColor: '#e5e7eb', alignItems: 'center' },
  roleActive: { backgroundColor: '#0f172a', borderColor: '#0f172a' },
  roleText: { color: '#334155', fontWeight: '900' },
  roleTextActive: { color: '#ffffff' },
  secondaryAction: { backgroundColor: '#16a34a', borderRadius: 16, padding: 15, alignItems: 'center' },
  secondaryActionText: { color: '#ffffff', fontWeight: '900', fontSize: 15 },
  resetButton: { alignItems: 'center', padding: 12 },
  resetText: { color: '#dc2626', fontWeight: '900' },
});
