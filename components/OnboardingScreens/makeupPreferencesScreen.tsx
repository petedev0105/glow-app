import { Ionicons } from '@expo/vector-icons'; // Import Ionicons
import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { onboardingQuestionsList, styles } from '../../constants/onboarding';

export const MakeUpPreferencesScreen = ({
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
      <Text style={styles.title}>{onboardingQuestionsList[7].title}</Text>
      <Text style={styles.subtitleCaption}>
        {onboardingQuestionsList[7].subtitle}
      </Text>

      <ScrollView style={{ height: '48%', marginTop: 40 }}>
        <View
          style={{
            ...styles.contentContainer,
            justifyContent: 'flex-start',
          }}
        >
          {onboardingQuestionsList[7].options?.map((goal, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                Haptics.notificationAsync(
                  Haptics.NotificationFeedbackType.Success
                );
                setSelectedGoal(goal);
              }}
              style={[
                styles.optionCard,
                selectedGoal === goal ? styles.optionCardSelected : {},
              ]}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {/* Use different icons based on the goal */}
                {goal === 'Natural' ? (
                  <Ionicons
                    name='flower-outline'
                    size={24}
                    color={selectedGoal === goal ? '#8A2BE2' : 'black'}
                  />
                ) : (
                  <Ionicons
                    name='eye-outline'
                    size={24}
                    color={selectedGoal === goal ? '#8A2BE2' : 'black'}
                  />
                )}
                <View style={{ marginLeft: 12 }}>
                  <Text
                    style={[
                      styles.optionTitle,
                      selectedGoal === goal ? styles.optionTitleSelected : {},
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
                    {goal === 'Natural'
                      ? 'I prefer a light and minimal makeup look.'
                      : 'I like to use bold and expressive makeup.'}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footerContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            selectedGoal === '' && localStyles.buttonDisabled,
          ]}
          onPress={onNext}
          disabled={selectedGoal === ''}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const localStyles = {
  buttonDisabled: {
    backgroundColor: '#CCC',
  },
};
