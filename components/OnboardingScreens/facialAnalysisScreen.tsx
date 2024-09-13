import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { onboardingQuestionsList, styles } from '../../constants/onboarding';

export const FacialAnalysisScreen = ({
  navigation,
  onNext,
  onAuthComplete,
}: {
  navigation: any;
  onNext: () => void;
  onAuthComplete: any;
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{onboardingQuestionsList[10].title}</Text>
      <Text style={styles.subtitleCaption}>
        {onboardingQuestionsList[10].subtitle}
      </Text>

      <View style={styles.contentContainer}>
        <View style={{ ...styles.imagePlaceholder, marginVertical: 40 }} />
      </View>

      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.button} onPress={onNext}>
          <Text style={styles.buttonText}>
            {onboardingQuestionsList[10].continueButton}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
