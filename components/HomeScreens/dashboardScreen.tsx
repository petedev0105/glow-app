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
  View,
} from 'react-native';
import { styles } from '../../constants/onboarding';

const DashboardScreen = () => {
  return (
    <ImageBackground
      resizeMode='cover'
      source={images.homeBgLarger} // Background image with cover mode
      style={styles.container} // Reusing container style
    >
      <SafeAreaView className='flex h-full'>
        <StatusBar barStyle='dark-content' backgroundColor='#6a51ae' />

        {/* Header section */}
        {/* <View style={styles.headerContainer}>
        <Image source={images.glowTitle} style={styles.logo as ImageStyle} />
      </View> */}
        <View className='flex items-center mb-10'>
          <Image source={images.glowTitle} style={styles.logo as ImageStyle} />
        </View>

        {/* Title section */}
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

        <View style={styles.contentContainer}>
          {/* Before/After Image section */}
          <View
            className='flex flex-col shadow gap-2 mt-5 justify-center rounded-3xl items-center card border-[#CACACA] border-2 p-2'
            style={{ width: '85%', height: 350 }}
          >
            <View
              style={{
                ...styles.imagePlaceholder,
                backgroundColor: 'transparent',
                width: 130,
                height: 130,
              }}
            >
              <Image
                source={images.dashboardGirl}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 10,
                  resizeMode: 'contain',
                }}
              />
            </View>

            <Text
              style={{
                ...styles.title,
                textAlign: 'center',
                fontSize: 20,
                fontWeight: 600,
              }}
            >
              Personalized Glow Up Guide
            </Text>
            <Text
              className='text-center p-2 px-5'
              style={styles.subtitleCaption}
            >
              Understand more about your characteristics and how to make them
              glow.
            </Text>

            <View className='flex flex-row gap-2 items-center justify-center rounded-3xl card border-gray-300 border-2 p-2'>
              <Ionicons name='scan' size={20}></Ionicons>
              <Text style={{ ...styles.title, fontSize: 16, fontWeight: 500 }}>
                Start Facial Analysis
              </Text>
            </View>
          </View>
        </View>

        {/* Footer with button */}
        <View style={styles.footerContainer}></View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default DashboardScreen;
