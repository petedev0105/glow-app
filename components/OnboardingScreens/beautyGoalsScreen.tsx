import glowTitle from '@/assets/images/glow-title.png';
import React, { useState } from 'react';
import { Image, ImageStyle, Text, TouchableOpacity, View } from 'react-native';
import { onboardingQuestionsList, styles } from '../../constants/onboarding';

export const BeautyGoalsScreen = ({
  navigation,
  onNext,
}: {
  navigation: any;
  onNext: () => void;
}) => {
  const [selectedGoal, setSelectedGoal] = useState('');

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

      <Text style={styles.title}>{onboardingQuestionsList[4].title}</Text>
      <Text style={styles.subtitle}>{onboardingQuestionsList[4].subtitle}</Text>

      <View
        style={{
          ...styles.contentContainer,
          marginHorizontal: 20,
          marginTop: 40,
          justifyContent: 'flex-start',
        }}
      >
        {onboardingQuestionsList[4].options?.map((goal, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedGoal(goal)}
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
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
