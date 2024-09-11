import glowTitle from '@/assets/images/glow-title.png';
import React, { useCallback } from 'react';
import { Image, ImageStyle, Text, TouchableOpacity, View } from 'react-native';
import { onboardingQuestionsList, styles } from '../../constants/onboarding';

import { router } from 'expo-router';
import OAuth from '../OAuth';

export const AuthScreen = ({ navigation }: { navigation: any }) => {
  const handleGoogleSignIn = useCallback(() => {
    router.replace('/(auth)/sign-up');
  }, []);

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
        <TouchableOpacity onPress={handleGoogleSignIn}>
          {/* <Text style={styles.buttonText}>Sign in with Google</Text> */}
          <OAuth />
        </TouchableOpacity>
      </View>
    </View>
  );
};
