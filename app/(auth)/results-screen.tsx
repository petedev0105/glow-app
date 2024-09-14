import { fetchAPI } from "@/lib/fetch";
import { useGlowResultStore } from "@/store/glowResultStore";
import { useImageStore } from "@/store/imageStore";
import { useUser } from "@clerk/clerk-expo";
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
import { useRouter } from "expo-router";
import { useRecommendationsStore } from "@/store/glowRecommendationsStore";

const { width, height } = Dimensions.get("window");

const ResultsScreen = () => {
  const { user } = useUser(); // Get the user outside the async function
  const images = useImageStore((state) => state.images); // Get the images outside the async function
  const imageUri = images[0]; // Assuming the first image is what you want to send

  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const { glowResult, setGlowResult } = useGlowResultStore();
  const [message, setMessage] = useState("Analyzing your features...");
  const [intervalDuration, setIntervalDuration] = useState(125);
  const { setRecommendations } = useRecommendationsStore();

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const rippleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const router = useRouter();

  const messages = [
    "Analyzing your features ✨",
    "Calculating glow score... 💫",
    "Just a moment, almost there... ⏳",
    "Finalizing results... 🌟",
  ];

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
            setIntervalDuration(75);
          } else if (newProgress === 30) {
            clearInterval(progressInterval);
            setIntervalDuration(50);
          }

          if (newProgress >= 100) {
            clearInterval(progressInterval);
            // Alert.alert('Analysis complete');
            // fetchGlowResults();

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

  const rippleScale = rippleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.1, 10], // Adjust the range to control the ripple size
  });

  // Fetch glow results from the API after loading completes
  // const fetchGlowResults = async () => {
  //   const { user } = useUser();
  //   const images = useImageStore((state) => state.images);
  //   const imageUri = images[0];

  //   try {
  //     const response = await fetchAPI('/(api)/(openai)/glowscore', {
  //       method: 'POST',
  //       body: JSON.stringify({ imageUri }),
  //     });
  //     setGlowResult(response);
  //   } catch (error) {
  //     console.error('Error fetching glow results:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    const fetchGlowResults = async ({
      prompt,
      imageUri,
    }: {
      prompt: string;
      imageUri: string;
    }) => {
      try {
        if (!imageUri) {
          throw new Error("Image URI is missing");
        }

        const response = await fetchAPI("/(api)/(openai)/glowscore", {
          method: "POST",
          body: JSON.stringify({ prompt, imageUri }),
        });

        console.log(response);

        // save to neondb under the user id

        // set into global state
        setGlowResult(response); // Set the fetched glow result

        const stringResponse = JSON.stringify(response);

        try {
          console.log("running recommendations api...");
          const recommendationsResponse = await fetchAPI(
            "/(api)/(openai)/glowrecommendations",
            {
              method: "POST",
              body: JSON.stringify({ stringResponse }),
            }
          );

          console.log(recommendationsResponse);
          // Store the recommendations in the Zustand store
          setRecommendations(recommendationsResponse);

          router.push("/(auth)/glow-results-screen");

          // Alert and stringify the recommendations response
          // Alert.alert(
          //   "Recommendations",
          //   JSON.stringify(recommendationsResponse)
          // );
        } catch (error) {
          console.log(error);
        }

        router.push("/glow-results-screen");

        // Alert.alert("Glow Score", JSON.stringify(response)); // Display the result
      } catch (error) {
        console.error("Error fetching glow results:", error);
        Alert.alert("Error", "Could not fetch glow results.");
      } finally {
        setLoading(false); // Ensure the loading state is set to false once the request completes
      }
    };

    if (loadingProgress >= 100 && !glowResult && imageUri) {
      // Fetch only when progress reaches 100, no result is fetched yet, and imageUri is valid
      fetchGlowResults({ prompt: "", imageUri });
    }
  }, [loadingProgress, imageUri, glowResult, setRecommendations]);

  return (
    <ImageBackground
      source={require("@/assets/images/glow-eclipse.png")} // Replace this with your actual image path
      style={resultStyles.background}
    >
      {/* Ripple effect */}
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
          {/* <Animated.Text style={[resultStyles.percentage, { opacity: fadeAnim }]}>
          {loadingProgress}%
        </Animated.Text> */}
          <Text style={resultStyles.percentage}>{loadingProgress}%</Text>
          <Animated.Text
            style={[resultStyles.caption, { opacity: fadeAnim }]}
            className="tracking-tight"
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
        {/* {glowResult ? (
          <View>
            <Text style={resultStyles.subtitleCaption}>
              {JSON.stringify(glowResult)}
            </Text>
            <Text style={resultStyles.subtitleCaption}>Glow Score:</Text>
            <Text style={resultStyles.subtitleCaption}>Insights:</Text>
          </View>
        ) : // (
        //   <View>
        //     <Text style={resultStyles.subtitleCaption}>
        //       Could not retrieve glow results. Please try again.
        //     </Text>
        //   </View>
        // )}
        null} */}
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
    // backgroundColor: '#FFFFFF',
    // backgroundColor: 'black',
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
  title: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitleCaption: {
    fontSize: 16,
    color: "white",
    marginTop: 10,
  },
  ripple: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    top: height / 2 - 50, // Center the ripple
    left: width / 2 - 50,
  },
});

export default ResultsScreen;
