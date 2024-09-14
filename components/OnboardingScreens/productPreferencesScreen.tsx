import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { onboardingQuestionsList, styles } from '../../constants/onboarding';

export const ProductPreferencesScreen = ({
  navigation,
  onNext,
  onAuthComplete,
}: {
  navigation: any;
  onNext: () => void;
  onAuthComplete: any;
}) => {
  const [selectedGoal, setSelectedGoal] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{onboardingQuestionsList[6].title}</Text>
      <Text style={styles.subtitleCaption}>
        {onboardingQuestionsList[6].subtitle}
      </Text>

      <View
        style={{
          ...styles.contentContainer,
          marginTop: 40,
          justifyContent: 'flex-start',
        }}
      >
        {onboardingQuestionsList[6].options?.map((goal, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
              );
              setSelectedGoal(goal);
            }}
            style={
              selectedGoal === goal
                ? styles.radioButtonSelected
                : styles.radioButton
            }
          >
            <View className='flex flex-row gap-2 items-center'>
              {selectedGoal !== goal && (
                <View style={styles.radioInactiveDot} />
              )}
              {selectedGoal === goal && <View style={styles.radioActiveDot} />}
              <Text style={styles.radioButtonText}>{goal}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.button} onPress={onNext}>
          <Text style={styles.buttonText} disabled={selectedGoal === ''}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
