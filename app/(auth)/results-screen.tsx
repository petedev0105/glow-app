import { fetchAPI } from '@/lib/fetch';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Animated, StyleSheet, View } from 'react-native';

const ResultsScreen = () => {
  const { imageUri } = useLocalSearchParams();
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [glowResult, setGlowResult] = useState(null);
  const [message, setMessage] = useState('Analyzing your features...');

  const fadeAnim = useRef(new Animated.Value(0)).current;

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

    // Simulate loading progress and update messages
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        const newProgress = prev + 1;
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          Alert.alert('Analysis complete');
          // fetchGlowResults(); // Call the API once loading reaches 100%
          return 100;
        }
        const messageIndex = Math.floor(newProgress / 25);
        setMessage(messages[messageIndex]);
        fadeIn();

        // fadeOut(() => {
        //   setMessage(messages[messageIndex]); // Update the message after fading out
        //   fadeIn(); // Fade the new message in
        // });

        return newProgress;
      });
    }, 50);

    return () => clearInterval(progressInterval);
  }, []);

  // Fetch glow results from the API after loading completes
  const fetchGlowResults = async () => {
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
    <View style={resultStyles.container}>
      <View style={resultStyles.contentContainer}>
        <Animated.Text style={[resultStyles.percentage, { opacity: fadeAnim }]}>
          {loadingProgress}%
        </Animated.Text>
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
  );
};

const resultStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#FFFFFF',
    backgroundColor: 'black',
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
