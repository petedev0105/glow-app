import { images } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Image,
  ImageBackground,
  ImageStyle,
  SafeAreaView,
  StatusBar,
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
      <SafeAreaView className='flex h-full'>
        <StatusBar barStyle='dark-content' backgroundColor='#6a51ae' />

        <View className='flex items-center mb-10'>
          <Image source={images.glowTitle} style={styles.logo as ImageStyle} />
        </View>

        {/* Title */}
        <View style={styles.headerContainer}>
          <Text style={{ ...styles.title, fontSize: 30, fontWeight: 600 }}>
            Ready to glow up?
          </Text>
          <Text
            className='mt-4'
            style={{ ...styles.title, fontSize: 20, fontWeight: 400 }}
          >
            Choose a scan to start
          </Text>
        </View>

        {/* Main Card */}
        <View style={styles.contentContainer}>
          <View
            className='shadow-lg flex flex-col justify-center items-center rounded-3xl'
            style={{
              width: '85%',
              height: 380,
              backgroundColor: '#fff',
              borderRadius: 20,
              padding: 20,
              borderWidth: 2,
              borderColor: '#dbdbdb',
            }}
          >
            {/* Image */}
            <View
              style={{
                width: 130,
                height: 130,
                borderRadius: 10,
                backgroundColor: 'transparent',
              }}
            >
              <Image
                source={images.dashboardGirl}
                style={{
                  width: '100%',
                  height: '100%',
                  resizeMode: 'contain',
                  borderRadius: 10,
                }}
              />
            </View>

            {/* Card Title */}
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                fontWeight: '600',
                marginTop: 15,
              }}
            >
              Personalized Glow Up Guide
            </Text>

            {/* Card Subtitle */}
            <Text
              style={{
                textAlign: 'center',
                padding: 10,
                fontSize: 14,
                color: '#6c757d',
              }}
            >
              Understand more about your characteristics and how to make them
              glow.
            </Text>

            {/* Start Facial Analysis Button */}
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: 10,
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 25,
                borderWidth: 2,
                borderColor: '#dbdbdb',
              }}
            >
              <Ionicons name='scan' size={20} />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  marginLeft: 10,
                }}
              >
                Start Facial Analysis
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Footer with button */}
        <View style={styles.footerContainer}></View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default DashboardScreen;
