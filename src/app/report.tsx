import React, { useState } from 'react';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

const categories = ['Lighting', 'Plumbing', 'Safety', 'Cleaning', 'Grounds', 'HVAC'];
const priorities = ['Low', 'Medium', 'High'];

export default function ReportIssueScreen() {
  const [category, setCategory] = useState('Lighting');
  const [priority, setPriority] = useState('Medium');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Report a facility issue</Text>
      <Text style={styles.subheading}>
        Capture structured request data, then check for similar open reports before creating duplicate work.
      </Text>

      <Text style={styles.label}>Category</Text>
      <View style={styles.rowWrap}>
        {categories.map((item) => (
          <Pressable key={item} style={[styles.chip, category === item && styles.chipActive]} onPress={() => setCategory(item)}>
            <Text style={[styles.chipText, category === item && styles.chipTextActive]}>{item}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.label}>Location</Text>
      <TextInput style={styles.input} defaultValue="Parking Lot B" />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        multiline
        defaultValue="Several lights are out near the west entrance and the area feels unsafe after dark."
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
        <Text style={styles.photoTitle}>Photo Attachment</Text>
        <Text style={styles.photoText}>Placeholder for camera/gallery upload in a production app.</Text>
      </View>

      <View style={styles.preview}>
        <Text style={styles.previewTitle}>Routing Preview</Text>
        <Text style={styles.previewText}>Department: Facilities</Text>
        <Text style={styles.previewText}>Estimated response: 1 business day</Text>
        <Text style={styles.previewText}>Duplicate check: Runs before final submission</Text>
      </View>

      <Pressable style={styles.primaryButton} onPress={() => router.push('/duplicate' as never)}>
        <Text style={styles.primaryButtonText}>Continue to Duplicate Check</Text>
      </Pressable>
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
  preview: { marginTop: 18, backgroundColor: '#eff6ff', borderColor: '#bfdbfe', borderWidth: 1, borderRadius: 18, padding: 16 },
  previewTitle: { color: '#1d4ed8', fontWeight: '900', fontSize: 16, marginBottom: 6 },
  previewText: { color: '#334155', fontWeight: '700', marginTop: 4 },
  primaryButton: { marginTop: 22, backgroundColor: '#2563eb', borderRadius: 18, padding: 16, alignItems: 'center' },
  primaryButtonText: { color: '#ffffff', fontSize: 16, fontWeight: '900' },
});
