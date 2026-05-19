import React, { useRef, useState } from 'react';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { AppFooter } from '../components/AppFooter';
import { PageBrand } from '../components/PageBrand';
import { StepIndicator } from '../components/StepIndicator';
import { StateMessage } from '../components/StateMessage';
import { TopNav } from '../components/TopNav';
import { useAppState } from '../context/AppStateContext';
import { RequestPriority } from '../types';
import { colors, fontSize, fontWeight, radius, spacing } from '../theme/design';

const categories = [
  'Lighting',
  'Plumbing',
  'Safety',
  'Cleaning',
  'Grounds',
  'HVAC',
  'Electrical',
  'Parking',
  'Doors / Locks',
  'Restrooms',
  'Accessibility',
  'Pest Control',
];

const priorities: RequestPriority[] = ['Low', 'Medium', 'High'];

function SectionCard({
  title,
  helper,
  children,
}: {
  title: string;
  helper?: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.sectionCard}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {helper ? <Text style={styles.sectionHelper}>{helper}</Text> : null}
      {children}
    </View>
  );
}

function FieldLabel({ label, required = false }: { label: string; required?: boolean }) {
  return (
    <Text style={styles.label}>
      {label}
      {required ? <Text style={styles.required}> *</Text> : null}
    </Text>
  );
}

export default function ReportIssueScreen() {
  const scrollRef = useRef<ScrollView>(null);
  const { setPendingRequest } = useAppState();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<RequestPriority>('Medium');
  const [photoLabel, setPhotoLabel] = useState('');
  const [geoLabel, setGeoLabel] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [missingFields, setMissingFields] = useState<string[]>([]);

  function showValidationError(fields: string[]) {
    setMissingFields(fields);
    setFormMessage(`Please complete: ${fields.join(', ')}.`);

    setTimeout(() => {
      scrollRef.current?.scrollTo({ y: 0, animated: true });
    }, 80);
  }

  function useDemoLocation() {
    const demoLocation = 'Dorm 6, Floor 2 - Hallway Bathroom';
    setLocation(demoLocation);
    setGeoLabel('Demo GPS: 43.6150, -116.2023');
    setFormMessage('Demo location attached.');
    setMissingFields((items) => items.filter((item) => item !== 'Location'));
  }

  function attachMockPhoto() {
    setPhotoLabel('Mock photo attached: hallway-issue.jpg');
    setFormMessage('Mock photo attached.');
  }

  function continueFlow() {
    const cleanTitle = title.trim();
    const cleanCategory = category.trim();
    const cleanLocation = location.trim();
    const cleanDescription = description.trim();

    const missing: string[] = [];

    if (!cleanTitle) missing.push('Title');
    if (!cleanCategory) missing.push('Category');
    if (!cleanLocation) missing.push('Location');
    if (!cleanDescription) missing.push('Description');

    if (missing.length) {
      showValidationError(missing);
      return;
    }

    setMissingFields([]);
    setPendingRequest({
      title: cleanTitle,
      category: cleanCategory,
      location: cleanLocation,
      description: cleanDescription,
      priority,
      photoLabel,
      geoLabel,
    });

    router.push('/duplicate' as never);
  }

  const hasMissing = (field: string) => missingFields.includes(field);

  return (
    <ScrollView ref={scrollRef} contentContainerStyle={styles.container}>
      <TopNav />

      <PageBrand
        title="New Request"
        subtitle="Create a local request with category, location, priority, attachments, and details."
      />

      <StepIndicator currentStep={1} />

      {formMessage ? (
        <StateMessage
          title={missingFields.length ? 'Missing required information' : 'Request detail updated'}
          message={
            missingFields.length
              ? `${formMessage} Required fields are marked with an asterisk.`
              : formMessage
          }
          variant={missingFields.length ? 'warning' : 'success'}
        />
      ) : null}

      <SectionCard
        title="Issue Details"
        helper="Start with the basic information staff will use to classify and route the request."
      >
        <FieldLabel label="Title" required />
        <TextInput
          style={[styles.input, hasMissing('Title') && styles.inputError]}
          value={title}
          onChangeText={(value) => {
            setTitle(value);
            if (value.trim()) {
              setMissingFields((items) => items.filter((item) => item !== 'Title'));
            }
          }}
          placeholder="Example: Dorm 6 water leak"
        />
        {hasMissing('Title') ? <Text style={styles.fieldError}>Enter a short title for the issue.</Text> : null}

        <FieldLabel label="Category" required />
        <Text style={styles.inlineHelp}>
          Choose the closest category so the request can be routed to the right team.
        </Text>

        <View style={styles.rowWrap}>
          {categories.map((item) => (
            <Pressable
              key={item}
              style={[styles.chip, category === item && styles.chipActive, hasMissing('Category') && styles.chipError]}
              onPress={() => {
                setCategory(item);
                setMissingFields((fields) => fields.filter((field) => field !== 'Category'));
              }}
            >
              <Text style={[styles.chipText, category === item && styles.chipTextActive]}>
                {item}
              </Text>
            </Pressable>
          ))}
        </View>
        {hasMissing('Category') ? <Text style={styles.fieldError}>Select one category before continuing.</Text> : null}

        <FieldLabel label="Priority" required />
        <View style={styles.rowWrap}>
          {priorities.map((item) => (
            <Pressable
              key={item}
              style={[styles.chip, priority === item && styles.chipActive]}
              onPress={() => setPriority(item)}
            >
              <Text style={[styles.chipText, priority === item && styles.chipTextActive]}>
                {item}
              </Text>
            </Pressable>
          ))}
        </View>
      </SectionCard>

      <SectionCard
        title="Location"
        helper="Location is required. The demo location button simulates future GPS/device support."
      >
        <FieldLabel label="Location" required />
        <TextInput
          style={[styles.input, hasMissing('Location') && styles.inputError]}
          value={location}
          onChangeText={(value) => {
            setLocation(value);
            if (value.trim()) {
              setMissingFields((items) => items.filter((item) => item !== 'Location'));
            }
          }}
          placeholder="Example: Dorm 6, Floor 2"
        />
        {hasMissing('Location') ? <Text style={styles.fieldError}>Enter a building, area, room, or approximate location.</Text> : null}

        <Pressable style={styles.utilityButton} onPress={useDemoLocation}>
          <Text style={styles.utilityButtonText}>Use Demo Location</Text>
        </Pressable>

        {geoLabel ? (
          <View style={styles.attachmentBox}>
            <Text style={styles.attachmentTitle}>Location Attached</Text>
            <Text style={styles.attachmentText}>{geoLabel}</Text>
          </View>
        ) : null}
      </SectionCard>

      <SectionCard
        title="Attachments"
        helper="Photo upload is mocked in this phase but the request object stores attachment metadata."
      >
        <Pressable style={styles.utilityButtonDark} onPress={attachMockPhoto}>
          <Text style={styles.utilityButtonText}>Attach Mock Photo</Text>
        </Pressable>

        {photoLabel ? (
          <View style={styles.attachmentBox}>
            <Text style={styles.attachmentTitle}>Photo Attached</Text>
            <Text style={styles.attachmentText}>{photoLabel}</Text>
          </View>
        ) : (
          <Text style={styles.helperText}>
            No photo attached. This is optional for the demo workflow.
          </Text>
        )}
      </SectionCard>

      <SectionCard
        title="Description"
        helper="Provide enough detail for staff to understand the problem before dispatching work."
      >
        <FieldLabel label="Description" required />
        <TextInput
          style={[styles.input, styles.textArea, hasMissing('Description') && styles.inputError]}
          multiline
          value={description}
          onChangeText={(value) => {
            setDescription(value);
            if (value.trim()) {
              setMissingFields((items) => items.filter((item) => item !== 'Description'));
            }
          }}
          placeholder="Describe what happened and where staff should look."
        />
        {hasMissing('Description') ? <Text style={styles.fieldError}>Add a short description of the issue.</Text> : null}
      </SectionCard>

      <View style={styles.requiredNote}>
        <Text style={styles.requiredNoteText}>* Required fields</Text>
      </View>

      <Pressable style={styles.primaryButton} onPress={continueFlow}>
        <Text style={styles.primaryButtonText}>Continue to Duplicate Check</Text>
      </Pressable>

      <AppFooter />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.xl,
    paddingBottom: 40,
  },
  sectionCard: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.xxl,
    padding: spacing.section,
    marginBottom: spacing.section,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.black,
  },
  sectionHelper: {
    color: colors.textSoft,
    fontWeight: fontWeight.semibold,
    lineHeight: 20,
    marginTop: 5,
    marginBottom: spacing.md,
  },
  label: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.black,
    color: colors.textMuted,
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  required: {
    color: colors.red,
  },
  inlineHelp: {
    color: colors.textSoft,
    fontWeight: fontWeight.semibold,
    lineHeight: 19,
    marginBottom: spacing.sm,
  },
  input: {
    backgroundColor: colors.page,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: 14,
    fontSize: fontSize.lg,
    color: colors.text,
  },
  inputError: {
    borderColor: colors.orange,
    backgroundColor: colors.orangeSoft,
  },
  fieldError: {
    color: colors.orangeText,
    fontWeight: fontWeight.black,
    marginTop: spacing.sm,
    lineHeight: 19,
  },
  textArea: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  chip: {
    borderRadius: radius.pill,
    paddingVertical: 9,
    paddingHorizontal: 14,
    backgroundColor: colors.page,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipError: {
    borderColor: colors.orangeBorder,
  },
  chipActive: {
    backgroundColor: colors.navy,
    borderColor: colors.navy,
  },
  chipText: {
    color: colors.textMuted,
    fontWeight: fontWeight.bold,
  },
  chipTextActive: {
    color: colors.white,
  },
  utilityButton: {
    backgroundColor: colors.blue,
    borderRadius: radius.lg,
    padding: 14,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  utilityButtonDark: {
    backgroundColor: colors.navy,
    borderRadius: radius.lg,
    padding: 14,
    alignItems: 'center',
  },
  utilityButtonText: {
    color: colors.white,
    fontWeight: fontWeight.black,
    fontSize: fontSize.base,
  },
  attachmentBox: {
    marginTop: spacing.md,
    backgroundColor: colors.greenSoft,
    borderColor: colors.greenBorder,
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing.md,
  },
  attachmentTitle: {
    color: colors.greenText,
    fontWeight: fontWeight.black,
    marginBottom: 5,
  },
  attachmentText: {
    color: colors.greenText,
    fontWeight: fontWeight.semibold,
    marginTop: 3,
  },
  helperText: {
    color: colors.textSoft,
    fontWeight: fontWeight.semibold,
    lineHeight: 20,
  },
  requiredNote: {
    marginTop: -4,
    marginBottom: spacing.md,
  },
  requiredNoteText: {
    color: colors.textSoft,
    fontWeight: fontWeight.bold,
  },
  primaryButton: {
    backgroundColor: colors.blue,
    borderRadius: radius.xl,
    padding: spacing.lg,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.black,
  },
});
