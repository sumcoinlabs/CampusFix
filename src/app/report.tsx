import React, { useState } from 'react';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { AppFooter } from '../components/AppFooter';
import { PageBrand } from '../components/PageBrand';
import { StepIndicator } from '../components/StepIndicator';
import { useAppState } from '../context/AppStateContext';
import { RequestPriority } from '../types';
import { TopNav } from '../components/TopNav';

const categories = ['Lighting', 'Plumbing', 'Safety', 'Cleaning', 'Grounds', 'HVAC'];
const priorities: RequestPriority[] = ['Low', 'Medium', 'High'];

export default function ReportIssueScreen() {
  const { setPendingRequest } = useAppState();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Lighting');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<RequestPriority>('Medium');
  const [photoLabel, setPhotoLabel] = useState('');
  const [geoLabel, setGeoLabel] = useState('');
  const [formMessage, setFormMessage] = useState('');

  function useDemoLocation() {
    const demoLocation = 'Dorm 6, Floor 2 - Hallway Bathroom';
    setLocation(demoLocation);
    setGeoLabel('Demo GPS: 43.6150, -116.2023');
    setFormMessage('Demo location attached.');
  }

  function attachMockPhoto() {
    setPhotoLabel('Mock photo attached: hallway-issue.jpg');
    setFormMessage('Mock photo attached.');
  }

  function continueFlow() {
    const cleanTitle = title.trim();
    const cleanLocation = location.trim();
    const cleanDescription = description.trim();

    if (!cleanTitle || !cleanLocation || !cleanDescription) {
      setFormMessage('Please enter a title, location, and description.');
      return;
    }

    setPendingRequest({
      title: cleanTitle,
      category,
      location: cleanLocation,
      description: cleanDescription,
      priority,
      photoLabel,
      geoLabel,
    });

    router.push('/duplicate' as never);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TopNav />
      <PageBrand
        title="Report Issue"
        subtitle="Create a local request with category, location, priority, and details."
      />

      <StepIndicator currentStep={1} />

      <Text style={styles.heading}>Report a facility issue</Text>
      <Text style={styles.subheading}>
        This creates a real local request after duplicate checking. Photo and location are mocked for demo safety.
      </Text>

      {formMessage ? (
        <View style={styles.messageBox}>
          <Text style={styles.messageText}>{formMessage}</Text>
        </View>
      ) : null}

      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Example: Dorm 6 water leak"
      />

      <Text style={styles.label}>Category</Text>
      <View style={styles.rowWrap}>
        {categories.map((item) => (
          <Pressable key={item} style={[styles.chip, category === item && styles.chipActive]} onPress={() => setCategory(item)}>
            <Text style={[styles.chipText, category === item && styles.chipTextActive]}>{item}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
        placeholder="Example: Dorm 6, Floor 2"
      />

      <View style={styles.actionRow}>
        <Pressable style={styles.utilityButton} onPress={useDemoLocation}>
          <Text style={styles.utilityButtonText}>Use Demo Location</Text>
        </Pressable>

        <Pressable style={styles.utilityButton} onPress={attachMockPhoto}>
          <Text style={styles.utilityButtonText}>Attach Mock Photo</Text>
        </Pressable>
      </View>

      {(photoLabel || geoLabel) ? (
        <View style={styles.attachmentBox}>
          <Text style={styles.attachmentTitle}>Attached Demo Metadata</Text>
          {photoLabel ? <Text style={styles.attachmentText}>Photo: {photoLabel}</Text> : null}
          {geoLabel ? <Text style={styles.attachmentText}>Location: {geoLabel}</Text> : null}
        </View>
      ) : null}

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        multiline
        value={description}
        onChangeText={setDescription}
        placeholder="Describe what happened and where staff should look."
      />

      <Text style={styles.label}>Priority</Text>
      <View style={styles.rowWrap}>
        {priorities.map((item) => (
          <Pressable key={item} style={[styles.chip, priority === item && styles.chipActive]} onPress={() => setPriority(item)}>
            <Text style={[styles.chipText, priority === item && styles.chipTextActive]}>{item}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.photoBox}>
        <Text style={styles.photoTitle}>Phase 2 Device Feature Placeholder</Text>
        <Text style={styles.photoText}>
          These mock buttons represent the future camera/gallery and device GPS workflow without requiring native permissions.
        </Text>
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
  messageBox: { backgroundColor: '#eff6ff', borderColor: '#bfdbfe', borderWidth: 1, borderRadius: 16, padding: 13, marginBottom: 14 },
  messageText: { color: '#1d4ed8', fontWeight: '900' },
  label: { fontSize: 14, fontWeight: '900', color: '#334155', marginBottom: 8, marginTop: 14 },
  input: { backgroundColor: '#ffffff', borderColor: '#e5e7eb', borderWidth: 1, borderRadius: 16, padding: 14, fontSize: 16, color: '#111827' },
  textArea: { minHeight: 110, textAlignVertical: 'top' },
  rowWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { borderRadius: 999, paddingVertical: 9, paddingHorizontal: 14, backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#e5e7eb' },
  chipActive: { backgroundColor: '#0f172a', borderColor: '#0f172a' },
  chipText: { color: '#334155', fontWeight: '800' },
  chipTextActive: { color: '#ffffff' },
  actionRow: { flexDirection: 'row', gap: 10, marginTop: 12 },
  utilityButton: { flex: 1, backgroundColor: '#0f172a', borderRadius: 14, padding: 13, alignItems: 'center' },
  utilityButtonText: { color: '#ffffff', fontWeight: '900', fontSize: 13 },
  attachmentBox: { marginTop: 14, backgroundColor: '#f0fdf4', borderColor: '#86efac', borderWidth: 1, borderRadius: 16, padding: 14 },
  attachmentTitle: { color: '#166534', fontWeight: '900', marginBottom: 5 },
  attachmentText: { color: '#166534', fontWeight: '700', marginTop: 3 },
  photoBox: { marginTop: 20, borderRadius: 18, borderWidth: 1, borderColor: '#cbd5e1', borderStyle: 'dashed', padding: 20, alignItems: 'center', backgroundColor: '#ffffff' },
  photoTitle: { fontWeight: '900', color: '#111827' },
  photoText: { marginTop: 5, color: '#64748b', textAlign: 'center', lineHeight: 20 },
  primaryButton: { marginTop: 22, backgroundColor: '#2563eb', borderRadius: 18, padding: 16, alignItems: 'center' },
  primaryButtonText: { color: '#ffffff', fontSize: 16, fontWeight: '900' },
});
