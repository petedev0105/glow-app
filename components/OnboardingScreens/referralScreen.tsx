import glowTitle from '@/assets/images/glow-title.png';
import React, { useState } from 'react';
import {
  Image,
  ImageStyle,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { onboardingQuestionsList, styles } from '../../constants/onboarding';

export const ReferralScreen = ({
  navigation,
  onNext,
  onAuthComplete,
}: {
  navigation: any;
  onNext: () => void;
  onAuthComplete: any;
}) => {
  const [referralCode, setReferralCode] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={glowTitle} style={styles.logo as ImageStyle} />
        <View style={styles.progressBar}>
          <View style={styles.activeDot} />
          <View style={styles.activeDot} />
          <View style={styles.inactiveDot} />
          <View style={styles.inactiveDot} />
        </View>
      </View>

      <Text style={styles.title}>{onboardingQuestionsList[1].title}</Text>

      <KeyboardAvoidingView
        style={styles.contentContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TextInput
          style={{
            ...styles.input,
            // borderWidth: 0,
            marginTop: 50,
            width: '60%',
            height: 50,
            textAlign: 'center',
            textAlignVertical: 'top',
          }}
          className='font-semibold text-[#836E89] shadow-xs'
          placeholder='Enter your code here, or skip'
          value={referralCode.toUpperCase()}
          onChangeText={setReferralCode}
        />
        <Text style={styles.subtitleCaption}>
          {onboardingQuestionsList[1].subtitle}
        </Text>
      </KeyboardAvoidingView>

      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.button} onPress={onNext}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
