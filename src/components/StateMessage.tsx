import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fontSize, fontWeight, radius, spacing } from '../theme/design';

type Variant = 'info' | 'success' | 'warning' | 'error' | 'empty';

type Props = {
  title: string;
  message?: string;
  variant?: Variant;
};

function getVariantStyle(variant: Variant) {
  if (variant === 'success') {
    return {
      box: styles.successBox,
      title: styles.successTitle,
      message: styles.successMessage,
    };
  }

  if (variant === 'warning') {
    return {
      box: styles.warningBox,
      title: styles.warningTitle,
      message: styles.warningMessage,
    };
  }

  if (variant === 'error') {
    return {
      box: styles.errorBox,
      title: styles.errorTitle,
      message: styles.errorMessage,
    };
  }

  if (variant === 'empty') {
    return {
      box: styles.emptyBox,
      title: styles.emptyTitle,
      message: styles.emptyMessage,
    };
  }

  return {
    box: styles.infoBox,
    title: styles.infoTitle,
    message: styles.infoMessage,
  };
}

export function StateMessage({ title, message, variant = 'info' }: Props) {
  const variantStyle = getVariantStyle(variant);

  return (
    <View style={[styles.box, variantStyle.box]}>
      <Text style={[styles.title, variantStyle.title]}>{title}</Text>
      {message ? <Text style={[styles.message, variantStyle.message]}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    borderWidth: 1,
    borderRadius: radius.xl,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.black,
  },
  message: {
    marginTop: 5,
    lineHeight: 20,
    fontWeight: fontWeight.semibold,
  },

  infoBox: {
    backgroundColor: colors.blueSoft,
    borderColor: colors.blueBorder,
  },
  infoTitle: {
    color: colors.blueText,
  },
  infoMessage: {
    color: colors.textMuted,
  },

  successBox: {
    backgroundColor: colors.greenSoft,
    borderColor: colors.greenBorder,
  },
  successTitle: {
    color: colors.greenText,
  },
  successMessage: {
    color: colors.greenText,
  },

  warningBox: {
    backgroundColor: colors.orangeSoft,
    borderColor: colors.orangeBorder,
  },
  warningTitle: {
    color: colors.orangeText,
  },
  warningMessage: {
    color: colors.orangeText,
  },

  errorBox: {
    backgroundColor: colors.redSoft,
    borderColor: colors.redBorder,
  },
  errorTitle: {
    color: colors.redText,
  },
  errorMessage: {
    color: colors.redText,
  },

  emptyBox: {
    backgroundColor: colors.white,
    borderColor: colors.border,
  },
  emptyTitle: {
    color: colors.text,
  },
  emptyMessage: {
    color: colors.textSoft,
  },
});
