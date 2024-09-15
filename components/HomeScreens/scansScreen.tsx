import { images } from '@/constants';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  Image,
  ImageBackground,
  ImageStyle,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { styles } from '../../constants/onboarding';

const ScansScreen = () => {
  // TODO call API to get all scans and display here
  const scans = [
    {
      id: 1,
      score: 85,
      potential: 90,
      image: images.dashboardGirl,
    },
    {
      id: 2,
      score: 85,
      potential: 90,
      image: images.dashboardGirl,
    },
    {
      id: 3,
      score: 85,
      potential: 90,
      image: images.dashboardGirl,
    },
    // {
    //   id: 4,
    //   score: 85,
    //   potential: 90,
    //   image: images.dashboardGirl,
    // },
    // {
    //   id: 5,
    //   score: 85,
    //   potential: 90,
    //   image: images.dashboardGirl,
    // },
  ];

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
              letterSpacing: -0.8,
              marginTop: 10, // Reduce top margin
            }}
          >
            My Scans
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
            View your scan history
          </Text>
        </View>

        {/* Main Content */}
        <View style={{ ...styles.contentContainer, paddingHorizontal: 20 }}>
          {scans.map((scan) => (
            <View key={scan.id} style={localStyles.scanCard}>
              <Image source={scan.image} style={localStyles.scanImage} />

              <View style={localStyles.scanDetails}>
                <Text style={localStyles.scanTitle}>Glow Up Scan</Text>
                <Text style={localStyles.scanDate}>15 Sep 2024</Text>

                <View style={localStyles.scoreContainer}>
                  <Text style={localStyles.scoreText}>Overall</Text>
                  <Text style={localStyles.scoreValue}>{scan.score}</Text>
                  <Text style={localStyles.scoreText}>Potential</Text>
                  <Text style={localStyles.scoreValue}>{scan.potential}</Text>
                  <Text style={localStyles.scoreText}>+4</Text>
                </View>

                <View style={localStyles.progressBar}>
                  <LinearGradient
                    colors={['#9B84FF', '#9B84FF']} // Match color for overall progress (purple)
                    style={[
                      localStyles.progressFill,
                      { width: `${(scan.score / 100) * 100}%` }, // Width based on overall score
                    ]}
                  />
                  <LinearGradient
                    colors={['#C7E9FF', '#C7E9FF']} // Match color for potential progress (light blue)
                    style={[
                      localStyles.progressFill,
                      {
                        width: `${(scan.potential / 100) * 100}%`, // Width based on potential score
                        position: 'absolute', // Position to overlay on the same bar
                        left: `${(scan.score / 100) * 100}%`, // Start where the overall score ends
                      },
                    ]}
                  />
                </View>
              </View>
            </View>
          ))}
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
  scanCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginVertical: 10,
    borderColor: '#dbdbdb',
    borderWidth: 1,
  },
  scanImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  scanDetails: {
    flex: 1,
    marginLeft: 10,
  },
  scanTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  scanDate: {
    fontSize: 12,
    color: '#6c757d',
    marginBottom: 10,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  scoreText: {
    fontSize: 12,
    color: '#6c757d',
  },
  scoreValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 5,
    position: 'relative',
  },
  progressFill: {
    height: '100%',
    borderRadius: 5,
  },
});

export default ScansScreen;
