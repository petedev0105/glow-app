import glowTitle from '@/assets/images/glow-title.png';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { Image, ImageStyle, Text, TouchableOpacity, View } from 'react-native';
import { onboardingQuestionsList, styles } from '../../constants/onboarding';

export const AgeScreen = ({
  navigation,
  onNext,
}: {
  navigation: any;
  onNext: () => void;
}) => {
  // Default to a recent year (e.g., 2000)
  const [selectedYear, setSelectedYear] = useState('2000');

  // Generate year options from 1970 to the current year
  const currentYear = new Date().getFullYear();
  const years = Array.from(new Array(currentYear - 1970 + 1), (v, i) =>
    (1970 + i).toString()
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={glowTitle} style={styles.logo as ImageStyle} />
        <View style={styles.progressBar}>
          <View style={styles.activeDot} />
          <View style={styles.activeDot} />
          <View style={styles.activeDot} />
          <View style={styles.activeDot} />
        </View>
      </View>

      <Text style={styles.title}>{onboardingQuestionsList[3].title}</Text>

      <View style={styles.contentContainer}>
        <Picker
          selectedValue={selectedYear}
          style={{
            ...styles.input,
            width: '60%',
            height: 150,
            borderColor: '#836E89',
            backgroundColor: '#F9F3F8',
            borderWidth: 2,
            borderRadius: 20,
          }}
          itemStyle={{ height: 120 }} // To show more visible options in the scroll
          onValueChange={(itemValue) => setSelectedYear(itemValue)}
        >
          {years.map((year) => (
            <Picker.Item key={year} label={year} value={year} />
          ))}
        </Picker>
      </View>

      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.button} onPress={onNext}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
