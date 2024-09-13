import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import {
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
          placeholder='E.g. A1X2Y3'
          placeholderTextColor='#a695ab'
          value={referralCode.toUpperCase()}
          onChangeText={(text) => {
            setReferralCode(text);
            Haptics.selectionAsync();
          }}
          onPressIn={() => {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          }}
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
