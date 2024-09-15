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
        {/* Map through options in pairs */}
        {onboardingQuestionsList[6].options?.map((goal, index) => {
          if (index % 2 === 0) {
            return (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  gap: 20,
                  marginBottom: 15,
                }}
              >
                {/* First option in the pair */}
                <TouchableOpacity
                  onPress={() => {
                    Haptics.notificationAsync(
                      Haptics.NotificationFeedbackType.Success
                    );
                    setSelectedGoal(
                      onboardingQuestionsList[6].options?.[index] || ''
                    );
                  }}
                  style={[
                    styles.optionCard,
                    selectedGoal ===
                      onboardingQuestionsList[6].options?.[index] &&
                      styles.optionCardSelected,
                    { width: '48%' },
                    { alignItems: 'center' },
                    { justifyContent: 'center' },
                    { paddingVertical: 20 },
                    { paddingRight: 20 },
                  ]}
                >
                  {/* Column layout for emoji and text */}
                  <View
                    style={{
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text style={{ fontSize: 40 }}>💧</Text>
                    <Text
                      style={[
                        styles.optionTitle,
                        selectedGoal ===
                          onboardingQuestionsList[6].options?.[index] &&
                          styles.optionTitleSelected,
                        { textAlign: 'center', marginTop: 10 },
                      ]}
                    >
                      {onboardingQuestionsList[6].options?.[index]}
                    </Text>
                  </View>
                </TouchableOpacity>

                {/* Second option in the pair (check if it exists) */}
                {onboardingQuestionsList[6].options?.[index + 1] && (
                  <TouchableOpacity
                    onPress={() => {
                      Haptics.notificationAsync(
                        Haptics.NotificationFeedbackType.Success
                      );
                      setSelectedGoal(
                        onboardingQuestionsList[6].options?.[index + 1] || ''
                      );
                    }}
                    style={[
                      styles.optionCard,
                      selectedGoal ===
                        onboardingQuestionsList[6].options?.[index + 1] &&
                        styles.optionCardSelected,
                      { width: '48%' },
                      { alignItems: 'center' },
                      { justifyContent: 'center' },
                      { paddingVertical: 20 },
                      { paddingRight: 20 },
                    ]}
                  >
                    <View
                      style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Text style={{ fontSize: 40 }}>💄</Text>
                      <Text
                        style={[
                          styles.optionTitle,
                          selectedGoal ===
                            onboardingQuestionsList[6].options?.[index + 1] &&
                            styles.optionTitleSelected,
                          { textAlign: 'center', marginTop: 10 },
                        ]}
                      >
                        {onboardingQuestionsList[6].options?.[index + 1]}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            );
          }
        })}
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
