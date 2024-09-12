import glowTitle from "@/assets/images/glow-title.png";
import React, { useState } from "react";
import {
  Image,
  ImageStyle,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from "react-native";
import { onboardingQuestionsList, styles } from "../../constants/onboarding";

export const SkinConcernsScreen = ({
  navigation,
  onNext,
  onAuthComplete,
}: {
  navigation: any;
  onNext: () => void;
  onAuthComplete: any;
}) => {
  const [selectedGoal, setSelectedGoal] = useState("");

  return (
    <View style={styles.container}>
      {/* <StatusBar barStyle="light-content" /> */}
      <View style={styles.headerContainer}>
        <Image source={glowTitle} style={styles.logo as ImageStyle} />
        <View style={styles.progressBar}>
          {[...Array(9)].map((_, index) => (
            <View
              key={index}
              style={index <= 5 ? styles.activeDot : styles.inactiveDot}
            />
          ))}
        </View>
      </View>

      <Text style={styles.title}>{onboardingQuestionsList[5].title}</Text>
      <Text style={styles.subtitleCaption}>
        {onboardingQuestionsList[5].subtitle}
      </Text>

      <View
        style={{
          ...styles.contentContainer,
          marginHorizontal: 20,
          marginTop: 40,
          justifyContent: "flex-start",
        }}
      >
        {onboardingQuestionsList[5].options?.map((goal, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedGoal(goal)}
            style={
              selectedGoal === goal
                ? styles.radioButtonSelected
                : styles.radioButton
            }
          >
            <View className="flex flex-row gap-2 items-center">
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
          <Text style={styles.buttonText} disabled={selectedGoal === ""}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
