import glowTitle from '@/assets/images/glow-title.png'; // Import logo
import React from 'react';
import { Image, ImageStyle, Text, TouchableOpacity, View } from 'react-native';
import { onboardingQuestionsList, styles } from '../../constants/onboarding';

export const TrustedScreen = ({
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
      <View style={styles.headerContainer}>
        <Image source={glowTitle} style={styles.logo as ImageStyle} />
        <View style={styles.progressBar}>
          <View style={styles.activeDot} />
          <View style={styles.inactiveDot} />
          <View style={styles.inactiveDot} />
          <View style={styles.inactiveDot} />
        </View>
      </View>

      <Text style={styles.title}>{onboardingQuestionsList[0].title}</Text>

      <View style={styles.contentContainer}>
        <View style={{ ...styles.imagePlaceholder, marginVertical: 40 }} />
      </View>

      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.button} onPress={onNext}>
          <Text style={styles.buttonText}>
            {onboardingQuestionsList[0].continueButton}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
