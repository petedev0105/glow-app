import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { onboardingQuestionsList, styles } from '../../constants/onboarding';

export const AgeScreen = ({
  navigation,
  onNext,
  onAuthComplete,
}: {
  navigation: any;
  onNext: () => void;
  onAuthComplete: any;
}) => {
  const [selectedYear, setSelectedYear] = useState('2000');
  const currentYear = new Date().getFullYear();
  const years = Array.from(new Array(currentYear - 1970 + 1), (v, i) =>
    (1970 + i).toString()
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{onboardingQuestionsList[3].title}</Text>
      <Text style={styles.subtitleCaption}>
        {onboardingQuestionsList[3].subtitle}
      </Text>

      <View style={styles.contentContainer}>
        <Picker
          selectedValue={selectedYear}
          style={{
            ...styles.input,
            width: '60%',
            height: 150,
            borderColor: '#836E89',
            // backgroundColor: '#F9F3F8',
            backgroundColor: 'white',
            borderWidth: 0,
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
