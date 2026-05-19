import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAppState } from '../context/AppStateContext';
import { colors, fontSize, fontWeight, radius, spacing } from '../theme/design';

type Props = {
  title: string;
  subtitle?: string;
};

export function PageBrand({ title, subtitle }: Props) {
  const { currentUser } = useAppState();

  if (!currentUser) {
    return null;
  }

  const isStaff = currentUser.role === 'staff';

  return (
    <View style={styles.wrapper}>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.eyebrow}>CampusFix</Text>
          <Text style={styles.title}>{title}</Text>
        </View>

        <View style={[styles.rolePill, isStaff ? styles.staffPill : styles.residentPill]}>
          <Text style={[styles.roleText, isStaff ? styles.staffText : styles.residentText]}>
            {isStaff ? 'Staff Admin' : 'Resident'}
          </Text>
        </View>
      </View>

      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.white,
    borderRadius: radius.xxl,
    padding: spacing.section,
    borderColor: colors.border,
    borderWidth: 1,
    marginBottom: spacing.section,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  eyebrow: {
    color: colors.blue,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.black,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  title: {
    color: colors.text,
    fontSize: 26,
    fontWeight: fontWeight.black,
    lineHeight: 32,
  },
  subtitle: {
    color: colors.textMuted,
    marginTop: spacing.sm,
    lineHeight: 21,
    fontWeight: fontWeight.semibold,
  },
  rolePill: {
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
  },
  residentPill: {
    backgroundColor: colors.blueSoft,
    borderColor: colors.blueBorder,
  },
  staffPill: {
    backgroundColor: colors.cyanSoft,
    borderColor: colors.cyanBorder,
  },
  roleText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.black,
  },
  residentText: {
    color: colors.blueText,
  },
  staffText: {
    color: colors.cyanText,
  },
});
