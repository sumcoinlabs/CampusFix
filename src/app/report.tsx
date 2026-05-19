import React, { useState } from 'react';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAppState } from '../context/AppStateContext';
import { RequestPriority } from '../types';
import { AppFooter } from '../components/AppFooter';
import { PageBrand } from '../components/PageBrand';

const categories = ['Lighting', 'Plumbing', 'Safety', 'Cleaning', 'Grounds', 'HVAC'];
const priorities: RequestPriority[] = ['Low', 'Medium', 'High'];

export default function ReportIssueScreen() {
  const { setPendingRequest } = useAppState();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Lighting');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<RequestPriority>('Medium');

  function continueFlow() {
    const cleanTitle = title.trim();
    const cleanLocation = location.trim();
    const cleanDescription = description.trim();

    if (!cleanTitle || !cleanLocation || !cleanDescription) {
      return;
    }

    setPendingRequest({
      title: cleanTitle,
      category,
      location: cleanLocation,
      description: cleanDescription,
      priority,
    });

    router.push('/duplicate' as never);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PageBrand title="Report Issue" subtitle="Create a local request with category, location, priority, and details." />
      <Text style={styles.heading}>Report a facility issue</Text>
      <Text style={styles.subheading}>This now creates a real local request after the duplicate check.</Text>

      <Text style={styles.label}>Title</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Example: Broken steps in Dorm 4" />

      <Text style={styles.label}>Category</Text>
      <View style={styles.rowWrap}>
        {categories.map((item) => (
          <Pressable key={item} style={[styles.chip, category === item && styles.chipActive]} onPress={() => setCategory(item)}>
            <Text style={[styles.chipText, category === item && styles.chipTextActive]}>{item}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.label}>Location</Text>
      <TextInput style={styles.input} value={location} onChangeText={setLocation} placeholder="Example: Dorm 4, Floor 2" />

      <Text style={styles.label}>Description</Text>
      <TextInput style={[styles.input, styles.textArea]} multiline value={description} onChangeText={setDescription} placeholder="Describe what happened and where staff should look." />

      <Text style={styles.label}>Priority</Text>
      <View style={styles.rowWrap}>
        {priorities.map((item) => (
          <Pressable key={item} style={[styles.chip, priority === item && styles.chipActive]} onPress={() => setPriority(item)}>
            <Text style={[styles.chipText, priority === item && styles.chipTextActive]}>{item}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.photoBox}>
        <Text style={styles.photoTitle}>Photo Attachment</Text>
        <Text style={styles.photoText}>Phase 2 will add camera/gallery support. This screen is ready for it.</Text>
      </View>

      <Pressable style={styles.primaryButton} onPress={continueFlow}>
        <Text style={styles.primaryButtonText}>Continue to Duplicate Check</Text>
      </Pressable>
          <AppFooter />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40 },
  heading: { fontSize: 28, fontWeight: '900', color: '#111827' },
  subheading: { marginTop: 8, fontSize: 15, color: '#475569', lineHeight: 22, marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '900', color: '#334155', marginBottom: 8, marginTop: 14 },
  input: { backgroundColor: '#ffffff', borderColor: '#e5e7eb', borderWidth: 1, borderRadius: 16, padding: 14, fontSize: 16, color: '#111827' },
  textArea: { minHeight: 110, textAlignVertical: 'top' },
  rowWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { borderRadius: 999, paddingVertical: 9, paddingHorizontal: 14, backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#e5e7eb' },
  chipActive: { backgroundColor: '#0f172a', borderColor: '#0f172a' },
  chipText: { color: '#334155', fontWeight: '800' },
  chipTextActive: { color: '#ffffff' },
  photoBox: { marginTop: 20, borderRadius: 18, borderWidth: 1, borderColor: '#cbd5e1', borderStyle: 'dashed', padding: 20, alignItems: 'center', backgroundColor: '#ffffff' },
  photoTitle: { fontWeight: '900', color: '#111827' },
  photoText: { marginTop: 5, color: '#64748b', textAlign: 'center' },
  primaryButton: { marginTop: 22, backgroundColor: '#2563eb', borderRadius: 18, padding: 16, alignItems: 'center' },
  primaryButtonText: { color: '#ffffff', fontSize: 16, fontWeight: '900' },
});
