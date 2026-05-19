import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CampusRequest } from '../types';
import { StatusBadge } from './StatusBadge';
import { colors, fontSize, fontWeight, radius, shadow, spacing } from '../theme/design';

type Props = {
  request: CampusRequest;
  onPress?: () => void;
};

function getPriorityStyle(priority: CampusRequest['priority']) {
  if (priority === 'High') {
    return {
      pill: styles.priorityHigh,
      text: styles.priorityHighText,
    };
  }

  if (priority === 'Medium') {
    return {
      pill: styles.priorityMedium,
      text: styles.priorityMediumText,
    };
  }

  return {
    pill: styles.priorityLow,
    text: styles.priorityLowText,
  };
}

export function RequestCard({ request, onPress }: Props) {
  const priorityStyle = getPriorityStyle(request.priority);

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.topRow}>
        <Text style={styles.id}>{request.id}</Text>

        <View style={styles.pillRow}>
          <View style={[styles.priorityPill, priorityStyle.pill]}>
            <Text style={[styles.priorityText, priorityStyle.text]}>{request.priority}</Text>
          </View>
          <StatusBadge status={request.status} />
        </View>
      </View>

      <Text style={styles.title}>{request.title}</Text>

      <View style={styles.metaRow}>
        <Text style={styles.category}>{request.category}</Text>
        <Text style={styles.dot}>•</Text>
        <Text style={styles.location} numberOfLines={1}>
          {request.location}
        </Text>
      </View>

      <Text style={styles.description} numberOfLines={2}>
        {request.description}
      </Text>

      <View style={styles.detailRow}>
        <View style={styles.detailBlock}>
          <Text style={styles.detailLabel}>Assigned</Text>
          <Text style={styles.detailValue} numberOfLines={1}>{request.assignee}</Text>
        </View>

        <View style={styles.detailBlock}>
          <Text style={styles.detailLabel}>Target</Text>
          <Text style={styles.detailValue} numberOfLines={1}>{request.targetResolution}</Text>
        </View>
      </View>

      <View style={styles.footerRow}>
        <Text style={styles.footerText}>{request.followers} following</Text>
        <Text style={styles.footerText}>Created {request.createdAt}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.xxl,
    padding: spacing.section,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.card,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.md,
  },
  id: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.black,
    color: colors.textSoft,
    letterSpacing: 0.3,
  },
  pillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flexShrink: 0,
  },
  priorityPill: {
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
  },
  priorityText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.black,
  },
  priorityHigh: {
    backgroundColor: colors.redSoft,
    borderColor: colors.redBorder,
  },
  priorityHighText: {
    color: colors.redText,
  },
  priorityMedium: {
    backgroundColor: colors.orangeSoft,
    borderColor: colors.orangeBorder,
  },
  priorityMediumText: {
    color: colors.orangeText,
  },
  priorityLow: {
    backgroundColor: colors.greenSoft,
    borderColor: colors.greenBorder,
  },
  priorityLowText: {
    color: colors.greenText,
  },
  title: {
    marginTop: spacing.md,
    color: colors.text,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.black,
    lineHeight: 24,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: 6,
  },
  category: {
    color: colors.blueText,
    fontWeight: fontWeight.black,
    fontSize: fontSize.base,
  },
  dot: {
    color: colors.textLight,
    fontWeight: fontWeight.black,
  },
  location: {
    color: colors.textMuted,
    fontWeight: fontWeight.bold,
    fontSize: fontSize.base,
    flex: 1,
  },
  description: {
    marginTop: spacing.sm,
    color: colors.textMuted,
    fontSize: fontSize.base,
    lineHeight: 20,
    fontWeight: fontWeight.medium,
  },
  detailRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  detailBlock: {
    flex: 1,
    backgroundColor: colors.page,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderColor: colors.border,
    borderWidth: 1,
  },
  detailLabel: {
    color: colors.textSoft,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.black,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  detailValue: {
    color: colors.text,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.black,
    marginTop: 4,
  },
  footerRow: {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopColor: colors.border,
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  footerText: {
    color: colors.textSoft,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
  },
});
