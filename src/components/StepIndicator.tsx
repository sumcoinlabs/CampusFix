import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  currentStep: 1 | 2 | 3;
};

const steps = [
  { number: 1, label: 'Details' },
  { number: 2, label: 'Duplicate Check' },
  { number: 3, label: 'Confirmation' },
];

export function StepIndicator({ currentStep }: Props) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Request Flow</Text>

      <View style={styles.row}>
        {steps.map((step, index) => {
          const isActive = step.number === currentStep;
          const isComplete = step.number < currentStep;

          return (
            <React.Fragment key={step.number}>
              <View style={styles.stepWrap}>
                <View
                  style={[
                    styles.circle,
                    isActive && styles.circleActive,
                    isComplete && styles.circleComplete,
                  ]}
                >
                  <Text
                    style={[
                      styles.circleText,
                      (isActive || isComplete) && styles.circleTextActive,
                    ]}
                  >
                    {isComplete ? '✓' : step.number}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.label,
                    isActive && styles.labelActive,
                    isComplete && styles.labelComplete,
                  ]}
                >
                  {step.label}
                </Text>
              </View>

              {index < steps.length - 1 ? (
                <View
                  style={[
                    styles.line,
                    step.number < currentStep && styles.lineComplete,
                  ]}
                />
              ) : null}
            </React.Fragment>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 16,
    borderColor: '#e5e7eb',
    borderWidth: 1,
    marginBottom: 16,
  },
  title: {
    color: '#111827',
    fontWeight: '900',
    fontSize: 16,
    marginBottom: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stepWrap: {
    alignItems: 'center',
    width: 82,
  },
  circle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleActive: {
    backgroundColor: '#2563eb',
  },
  circleComplete: {
    backgroundColor: '#16a34a',
  },
  circleText: {
    color: '#475569',
    fontWeight: '900',
    fontSize: 14,
  },
  circleTextActive: {
    color: '#ffffff',
  },
  label: {
    marginTop: 7,
    color: '#64748b',
    fontWeight: '800',
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 15,
  },
  labelActive: {
    color: '#2563eb',
  },
  labelComplete: {
    color: '#16a34a',
  },
  line: {
    flex: 1,
    height: 3,
    backgroundColor: '#e2e8f0',
    marginTop: 16,
    borderRadius: 999,
  },
  lineComplete: {
    backgroundColor: '#16a34a',
  },
});
