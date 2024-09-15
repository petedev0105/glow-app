import { Ionicons } from '@expo/vector-icons'; // For adding icons if needed
import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { onboardingQuestionsList, styles } from '../../constants/onboarding';

export const SkinConcernsScreen = ({
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
      <Text style={styles.title}>{onboardingQuestionsList[5].title}</Text>
      <Text style={styles.subtitleCaption}>
        {onboardingQuestionsList[5].subtitle}
      </Text>

      <View
        style={{
          ...styles.contentContainer,
          marginTop: 40,
          justifyContent: 'flex-start',
        }}
      >
        {onboardingQuestionsList[5].options?.map((goal, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
              );
              setSelectedGoal(goal);
            }}
            style={[
              styles.optionCard, // Apply the default card style
              selectedGoal === goal && styles.optionCardSelected, // Apply the selected style when active
            ]}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {/* Optionally add icons based on the goal */}
              <Ionicons
                name={goal === 'Sensitive' ? 'leaf-outline' : 'shield-outline'}
                size={24}
                color={selectedGoal === goal ? '#8A2BE2' : 'black'}
              />
              <View style={{ marginLeft: 12 }}>
                <Text
                  style={[
                    styles.optionTitle, // Default title style
                    selectedGoal === goal && styles.optionTitleSelected, // Apply selected title style
                  ]}
                >
                  {goal}
                </Text>
                <Text
                  style={[
                    styles.optionDescription,
                    selectedGoal === goal ? styles.optionTitleSelected : {},
                  ]}
                >
                  {goal === 'Sensitive'
                    ? 'My skin has reacted negatively to some skincare in the past.'
                    : 'My skin shows no reaction to certain ingredients.'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footerContainer}>
        <TouchableOpacity
          style={[styles.button, selectedGoal === '' && styles.buttonDisabled]}
          onPress={onNext}
          disabled={selectedGoal === ''}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
