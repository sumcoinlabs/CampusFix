export const colors = {
  navy: '#0f172a',
  navySoft: '#1e293b',

  blue: '#2563eb',
  blueSoft: '#eff6ff',
  blueBorder: '#bfdbfe',
  blueText: '#1d4ed8',

  green: '#16a34a',
  greenSoft: '#f0fdf4',
  greenBorder: '#86efac',
  greenText: '#166534',

  orange: '#f97316',
  orangeSoft: '#fff7ed',
  orangeBorder: '#fed7aa',
  orangeText: '#9a3412',

  red: '#dc2626',
  redSoft: '#fee2e2',
  redBorder: '#fecaca',
  redText: '#b91c1c',

  cyanSoft: '#ecfeff',
  cyanBorder: '#67e8f9',
  cyanText: '#155e75',

  white: '#ffffff',
  page: '#f8fafc',
  border: '#e5e7eb',
  borderStrong: '#cbd5e1',

  text: '#111827',
  textMuted: '#475569',
  textSoft: '#64748b',
  textLight: '#94a3b8',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  section: 18,
};

export const radius = {
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 20,
  hero: 24,
  pill: 999,
};

export const fontSize = {
  xs: 11,
  sm: 12,
  base: 14,
  md: 15,
  lg: 16,
  xl: 18,
  xxl: 22,
  pageTitle: 28,
  hero: 34,
};

export const fontWeight = {
  medium: '600' as const,
  semibold: '700' as const,
  bold: '800' as const,
  black: '900' as const,
};

export const shadow = {
  card: {
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
};

export const layout = {
  screenPadding: spacing.xl,
  screenBottomPadding: 40,
};

export const component = {
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.xxl,
    padding: spacing.section,
    borderColor: colors.border,
    borderWidth: 1,
  },
  infoCard: {
    backgroundColor: colors.blueSoft,
    borderColor: colors.blueBorder,
    borderWidth: 1,
    borderRadius: radius.xl,
    padding: spacing.lg,
  },
  dangerButton: {
    backgroundColor: colors.redSoft,
    borderColor: colors.redBorder,
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: 14,
    alignItems: 'center' as const,
  },
  primaryButton: {
    backgroundColor: colors.blue,
    borderRadius: radius.xl,
    padding: spacing.lg,
    alignItems: 'center' as const,
  },
};
