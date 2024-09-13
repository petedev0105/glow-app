import { styles } from '@/constants/onboarding';
import { fetchAPI } from '@/lib/fetch'; // Assuming you have a function to call your API
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const ResultsScreen = () => {
  const { imageUri } = useLocalSearchParams();
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [glowResult, setGlowResult] = useState(null);

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          fetchGlowResults(); // Call the API once loading reaches 100%
          return prev;
        }
        return prev + 1;
      });
    }, 50); // Adjust the interval for faster/slower progress

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
    <View style={styles.container}>
      {loading ? (
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Analyzing your glow...</Text>
          <View style={styles.imagePlaceholder}>
            <Image
              source={{ uri: imageUri as string }}
              style={{ width: '100%', height: 300, borderRadius: 10 }}
            />
          </View>
          <Text style={styles.subtitleCaption}>
            Progress: {loadingProgress}%
          </Text>
          <ActivityIndicator size='large' color='#0000ff' />
        </View>
      ) : (
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Glow Analysis Results</Text>
          {glowResult ? (
            // <View style={styles.resultsContainer}>
            //   <Text style={styles.subtitleCaption}>
            //     Glow Score: {glowResult.score}
            //   </Text>
            //   <Text style={styles.subtitleCaption}>
            //     Insights: {glowResult.insights}
            //   </Text>
            //   <TouchableOpacity
            //     style={styles.button}
            //     // onPress={() => router.push('/(auth)/facial-analysis')}
            //     onPress={() => {}}
            //   >
            //     <Text style={styles.buttonText}>Analyze Another</Text>
            //   </TouchableOpacity>
            // </View>
            <View>
              <Text style={styles.subtitleCaption}>Glow Score:</Text>
              <Text style={styles.subtitleCaption}>Insights:</Text>
              <TouchableOpacity
                style={styles.button}
                // onPress={() => router.push('/(auth)/facial-analysis')}
                onPress={() => {}}
              >
                <Text style={styles.buttonText}>Analyze Another</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Text style={styles.subtitleCaption}>
              Could not retrieve glow results. Please try again.
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

export default ResultsScreen;
