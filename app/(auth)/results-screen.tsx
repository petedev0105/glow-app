import { fetchAPI } from "@/lib/fetch";
import { useScanResultsStore } from "@/store/scanResultsStore";
import { useImageStore } from "@/store/imageStore";
import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  Easing,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AWS from "aws-sdk";

const { width, height } = Dimensions.get("window");

const ResultsScreen = () => {
  const { user } = useUser();
  const userId = user?.id;
  const images = useImageStore((state: { images: string[] }) => state.images);
  const imageUri = images[0];

  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const { scanResults, setScanResults } = useScanResultsStore();
  const [message, setMessage] = useState("Analyzing your features...");
  const [intervalDuration, setIntervalDuration] = useState(80);

  const [apiCallsStarted, setApiCallsStarted] = useState<boolean>(false);
  const [apiCallsComplete, setApiCallsComplete] = useState<boolean>(false);

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const rippleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const rippleScale = rippleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.1, 10],
  });

  const router = useRouter();

  const messages = [
    "Analyzing your features ✨",
    "Calculating glow score... 💫",
    "Just a moment, almost there... ⏳",
    "Finalizing results... 🌟",
  ];

  // useEffect(() => {
  //   console.log("image Uri is: ", imageUri);
  // }, []);

  useEffect(() => {
    // Ripple animation
    const startRippleAnimation = () => {
      Animated.loop(
        Animated.parallel([
          Animated.timing(rippleAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: false,
            easing: Easing.out(Easing.ease),
          }),
          Animated.timing(opacityAnim, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: false,
            easing: Easing.out(Easing.ease),
          }),
        ])
      ).start();
    };

    startRippleAnimation();

    // Fade in and out functions
    const fadeIn = () => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    };

    const fadeOut = (callback: () => void) => {
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

    // Progress logic
    const startProgressInterval = () => {
      return setInterval(() => {
        if (apiCallsComplete) {
          setLoadingProgress(100);
        }

        setLoadingProgress((prev) => {
          const newProgress = prev + 1;

          if (newProgress % 25 === 0) {
            const messageIndex = Math.floor(newProgress / 25);
            fadeOut(() => {
              setMessage(messages[messageIndex]);
              fadeIn();
            });
          }

          return newProgress >= 100 ? 100 : newProgress;
        });
      }, intervalDuration);
    };

    let progressInterval = startProgressInterval();

    // Cleanup
    return () => clearInterval(progressInterval);
  }, [intervalDuration, apiCallsComplete]);

  useEffect(() => {
    const fetchGlowResults = async ({
      prompt,
      imageUri,
    }: {
      prompt: string;
      imageUri: string;
    }) => {
      if (!imageUri) {
        Alert.alert("Error", "Image URI is missing");
        return;
      }

      setLoading(true);
      setApiCallsStarted(true);

      console.log("calling the fetchglowscore function...");

      try {
        console.log("getting glow score...");
        const glowScoreResponse = await fetchAPI(
          "https://wandering-sun-9736.kiettran255.workers.dev/api/glow-score",
          {
            method: "POST",
            body: JSON.stringify({ prompt, imageUri }),
          }
        );

        console.log("Glow Score Response:", glowScoreResponse);

        const stringResponse = JSON.stringify(glowScoreResponse);

        try {
          console.log("running recommendations API...");
          const recommendationsResponse = await fetchAPI(
            "https://wandering-sun-9736.kiettran255.workers.dev/api/glow-recommendations",
            {
              method: "POST",
              body: JSON.stringify({ stringResponse }),
            }
          );

          console.log("Recommendations Response:", recommendationsResponse);

          let s3ImageUrl = "";

          try {
            const response = await fetch(
              "https://wandering-sun-9736.kiettran255.workers.dev/api/upload-image",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  imageUri: imageUri,
                  userId: userId,
                }),
              }
            );

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log("Upload successful:", result.message);
            console.log("Image URL:", result.location);

            // return result.location; // Return the S3 URL of the uploaded image
            s3ImageUrl = result.location;
          } catch (error) {
            console.error("Error uploading image:", error);
            throw error;
          }

          const scanResults = {
            imageUrl: s3ImageUrl,
            glowScore: glowScoreResponse,
            recommendations: recommendationsResponse,
          };

          try {
            const updateResponse = await fetchAPI(
              `https://wandering-sun-9736.kiettran255.workers.dev/api/save-scan-results/${userId}`,
              {
                method: "POST",
                body: JSON.stringify({ scanResults }),
              }
            );

            if (updateResponse) {
              console.log("updated successfully");
              console.log(updateResponse);
            }
          } catch (updateError) {
            console.error("Error updating user scan results:", updateError);
          }

          console.log("Combined Scan Results:", scanResults);

          setScanResults(scanResults);

          // setApiCallsComplete(true);

          router.replace("/push-results-screen");
        } catch (recommendationError) {
          console.error("Error fetching recommendations:", recommendationError);
        }
      } catch (error) {
        console.error("Error fetching glow results:", error);
        Alert.alert("Error", "Could not fetch glow results.");
      } finally {
        setLoading(false);
      }
    };

    if (loadingProgress >= 1 && imageUri && !apiCallsStarted) {
      fetchGlowResults({ prompt: "Here is an image of a face.", imageUri });
    }
  }, [loadingProgress, imageUri, setScanResults]);

  // useEffect(() => {
  //   if (apiCallsComplete && loadingProgress >= 100) {
  //     console.log("Navigating to unlock-results-screen");
  //     console.log("User has Payed.");
  //     if (!payedUser) {
  //       router.replace("/unlock-results-screen");
  //     } else {
  //       router.replace("/glow-results-screen");
  //     }
  //   }
  // }, [apiCallsComplete, loadingProgress]);

  // test unlock results screen
  // useEffect(() => {
  //   if (apiCallsComplete && loadingProgress >= 100) {
  //     router.replace("/unlock-results-screen");
  //   }
  // }, [apiCallsComplete, loadingProgress]);

  return (
    <ImageBackground
      source={require("@/assets/images/glow-eclipse.png")}
      style={resultStyles.background}
    >
      <Animated.View
        style={[
          resultStyles.ripple,
          {
            transform: [{ scale: rippleScale }],
            opacity: opacityAnim,
          },
        ]}
      />
      <View style={resultStyles.container}>
        <View style={resultStyles.contentContainer}>
          <Text style={resultStyles.percentage}>{loadingProgress}%</Text>
          <Animated.Text
            style={[resultStyles.caption, { opacity: fadeAnim }]}
            className="tracking-tight"
          >
            {loadingProgress >= 100
              ? "Get ready for some \nawesome things 💗"
              : message}
          </Animated.Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const resultStyles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  percentage: {
    fontSize: 85,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 10,
  },
  caption: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
  ripple: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    top: height / 2 - 50,
    left: width / 2 - 50,
  },
});

export default ResultsScreen;
