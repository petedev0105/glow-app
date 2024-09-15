import { Ionicons } from '@expo/vector-icons'; // Import Ionicons
import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { onboardingQuestionsList, styles } from '../../constants/onboarding';

export const BeautyGoalsScreen = ({
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
      <Text style={styles.title}>{onboardingQuestionsList[4].title}</Text>
      <Text style={styles.subtitleCaption}>
        {onboardingQuestionsList[4].subtitle}
      </Text>

      <View
        style={{
          ...styles.contentContainer,
          marginTop: 40,
          justifyContent: 'flex-start',
        }}
      >
        {onboardingQuestionsList[4].options?.map((goal, index) => (
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
              {goal === 'Sensitive' ? (
                <Ionicons
                  name='leaf-outline'
                  size={24}
                  color={selectedGoal === goal ? '#8A2BE2' : 'black'}
                />
              ) : (
                <Ionicons
                  name='shield-outline'
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitleCaption: {
    fontSize: 16,
    color: '#999',
    marginBottom: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  footerContainer: {
    paddingVertical: 20,
  },
  button: {
    backgroundColor: '#00796B',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#CCC',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
};
