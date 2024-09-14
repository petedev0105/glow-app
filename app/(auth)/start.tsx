import { router } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../../constants/onboarding';

const Start = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        We’ve helped thousands of people glow up.
      </Text>

      <View style={styles.contentContainer}>
        <View style={styles.snapPlaceholder}>
          <Image
            source={require('../../assets/images/model.png')}
            style={{ width: '100%', height: '100%', borderRadius: 10 }}
          />
        </View>
      </View>

      <View style={styles.footerContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/(auth)/welcome')}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Start;
