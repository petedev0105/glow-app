import { images } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Image,
  ImageBackground,
  ImageStyle,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from '../../constants/onboarding';

const DashboardScreen = () => {
  return (
    <ImageBackground
      resizeMode='cover'
      source={images.homeBgLarger}
      style={styles.container}
    >
      <SafeAreaView style={localStyles.safeArea}>
        <StatusBar barStyle='dark-content' backgroundColor='#6a51ae' />

        <View style={localStyles.logoContainer}>
          <Image source={images.glowTitle} style={styles.logo as ImageStyle} />
        </View>

        {/* Title */}
        <View style={styles.headerContainer}>
          <Text
            style={{
              ...styles.title,
              fontSize: 30,
              fontWeight: '600',
              marginTop: 20,
              letterSpacing: -0.8,
            }}
          >
            Ready to glow up?
          </Text>
          <Text
            style={{
              ...styles.title,
              fontSize: 20,
              fontWeight: '400',
              marginTop: 16,
              letterSpacing: -0.8,
            }}
          >
            Choose a scan to start
          </Text>
        </View>

        {/* Main Card */}
        <View style={styles.contentContainer}>
          <View style={localStyles.mainCard}>
            {/* Image */}
            <View style={localStyles.imageContainer}>
              <Image source={images.dashboardGirl} style={localStyles.image} />
            </View>

            {/* Card Title */}
            <Text style={localStyles.cardTitle}>
              Personalized Glow Up Guide
            </Text>

            {/* Card Subtitle */}
            <Text style={localStyles.cardSubtitle}>
              Understand more about your characteristics and how to make them
              glow.
            </Text>

            {/* Start Facial Analysis Button */}
            <TouchableOpacity style={localStyles.startButton}>
              <Ionicons name='scan' size={20} />
              <Text style={localStyles.buttonText}>Start Facial Analysis</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Footer with button */}
        <View style={styles.footerContainer}></View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const localStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    marginVertical: 20,
  },
  mainCard: {
    width: '85%',
    height: 380,
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 20,
    borderWidth: 1,
    borderColor: '#dbdbdb',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10%',
  },
  imageContainer: {
    width: 130,
    height: 130,
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 10,
  },
  cardTitle: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 18,
    paddingHorizontal: 10,
    letterSpacing: -0.8,
  },
  cardSubtitle: {
    textAlign: 'center',
    padding: 10,
    fontSize: 14,
    letterSpacing: -0.4,
    color: '#6c757d',
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#dbdbdb',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 10,
    paddingVertical: 5,
  },
});

export default DashboardScreen;
