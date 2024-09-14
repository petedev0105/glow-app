import { fetchAPI } from '@/lib/fetch';
import { useImageStore } from '@/store/imageStore';
import { useUser } from '@clerk/clerk-expo';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const ResultsScreen = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [glowResult, setGlowResult] = useState(null);
  const [message, setMessage] = useState('Analyzing your features...');
  const [intervalDuration, setIntervalDuration] = useState(125);

  const fadeAnim = useRef(new Animated.Value(1)).current;

  const messages = [
    'Analyzing your features ✨',
    'Calculating glow score... 💫',
    'Just a moment, almost there... ⏳',
    'Finalizing results... 🌟',
  ];

  useEffect(() => {
    // Fade in function
    const fadeIn = () => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    };

    // Fade out function
    const fadeOut = (callback: { (): void; (): void }) => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        if (callback) callback();
      });
    };

    // Start with the first message visible
    setMessage(messages[0]);
    fadeIn();

    const startProgressInterval = () => {
      return setInterval(() => {
        setLoadingProgress((prev) => {
          const newProgress = prev + 1;

          // Switch to 50ms interval after 40% progress
          if (newProgress === 10) {
            clearInterval(progressInterval);
            setIntervalDuration(100);
          } else if (newProgress === 20) {
            clearInterval(progressInterval);
            setIntervalDuration(80);
          } else if (newProgress === 30) {
            clearInterval(progressInterval);
            setIntervalDuration(60);
          }

          if (newProgress >= 100) {
            clearInterval(progressInterval);
            Alert.alert('Analysis complete');
            return 100;
          }

          if (newProgress % 25 === 0) {
            const messageIndex = Math.floor(newProgress / 25);
            fadeOut(() => {
              setMessage(messages[messageIndex]);
              fadeIn();
            });
          }

          return newProgress;
        });
      }, intervalDuration);
    };

    let progressInterval = startProgressInterval();

    // Update interval once the progress reaches 40%
    if (loadingProgress >= 25) {
      clearInterval(progressInterval); // Clear the old interval
      progressInterval = startProgressInterval(); // Start a new interval with 50ms
    }

    return () => clearInterval(progressInterval);
  }, [intervalDuration]);

  // Fetch glow results from the API after loading completes
  const fetchGlowResults = async () => {
    const { user } = useUser();
    const images = useImageStore((state) => state.images);
    const imageUri = images[0];

    try {
      const response = await fetchAPI('/(api)/(openai)/glowscore', {
        method: 'POST',
        body: JSON.stringify({ imageUri }),
      });
      setGlowResult(response);
    } catch (error) {
      console.error('Error fetching glow results:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('@/assets/images/glow-eclipse.png')} // Replace this with your actual image path
      style={resultStyles.background}
    >
      <View style={resultStyles.container}>
        <View style={resultStyles.contentContainer}>
          {/* <Animated.Text style={[resultStyles.percentage, { opacity: fadeAnim }]}>
          {loadingProgress}%
        </Animated.Text> */}
          <Text style={resultStyles.percentage}>{loadingProgress}%</Text>
          <Animated.Text
            style={[resultStyles.caption, { opacity: fadeAnim }]}
            className='tracking-tight'
          >
            {message}
          </Animated.Text>
        </View>
        {/* {!loading ? (
        <View style={resultStyles.contentContainer}>
          <Text style={resultStyles.percentage}>{loadingProgress}%</Text>
          <Text style={resultStyles.caption} className='tracking-tight'>
            Analyzing your features...
          </Text>
        </View>
      ) : (
        <View style={resultStyles.contentContainer}>
          <Text style={resultStyles.title}>Glow Analysis Results</Text>
          {glowResult ? (
            <View>
              <Text style={resultStyles.subtitleCaption}>Glow Score:</Text>
              <Text style={resultStyles.subtitleCaption}>Insights:</Text>
            </View>
          ) : (
            <View>
              <Text style={resultStyles.subtitleCaption}>
                Could not retrieve glow results. Please try again.
              </Text>
            </View>
          )}
        </View>
      )} */}
      </View>
    </ImageBackground>
  );
};

const resultStyles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#FFFFFF',
    // backgroundColor: 'black',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  percentage: {
    fontSize: 85,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  caption: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  title: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitleCaption: {
    fontSize: 16,
    color: 'white',
    marginTop: 10,
  },
});

export default ResultsScreen;
