import glowTitle from '@/assets/images/glow-title.png';
import React from 'react';
import { Image, ImageStyle, Text, TouchableOpacity, View } from 'react-native';
import { onboardingQuestionsList, styles } from '../../constants/onboarding';

import OAuth from '../OAuth';

export const AuthScreen = ({
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
          <View style={styles.activeDot} />
          <View style={styles.activeDot} />
          <View style={styles.inactiveDot} />
        </View>
      </View>

      <View style={styles.contentContainer}>
        {/* Placeholder for an image */}
        <View style={styles.imagePlaceholder} />
        <Text style={{ ...styles.title, marginTop: 20 }}>
          {onboardingQuestionsList[2].title}
        </Text>
        <Text style={styles.subtitle}>
          {onboardingQuestionsList[2].subtitle}
        </Text>
      </View>

      <View style={styles.footerContainer}>
        <TouchableOpacity onPress={onAuthComplete}>
          <OAuth />
        </TouchableOpacity>
      </View>
    </View>
  );
};
