import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
  StatusBar,
  // Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { icons, images } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { useRouter } from "expo-router";
import { BlurView } from "expo-blur";
import analysis from "../assets/images/analysis.png";
import auraLogo from "../assets/images/logo.png";
import Swiper from "react-native-swiper";
import trophy from "../assets/images/trophy.png";
import { useUser } from "@clerk/clerk-expo";
import bg from "../assets/images/home-bg.png";
// import Purchases from "react-native-purchases";

const questions = [
  {
    id: 0,
    title: `Let's get to know you`,
    inputs: [
      { label: "Your name", placeholder: "Enter your name" },
      {
        label: "How would you describe yourself in 1 word?",
        placeholder: "Type 1 word...",
      },
    ],
  },

  {
    id: 1,
    title:
      "You're scrolling at 3am and accidentally like an old post from an ex. What do you do? 🤔",
    options: [
      "Unlike and hope they didn't see the notification 🙈",
      "Like a bunch of other posts to cover it up 😅",
      "Send a casual DM explaining the late-night scroll 📱",
      "Log off and pretend it never happened 🚪",
    ],
  },
  {
    id: 2,
    title:
      "You're at a party and the aux cord gets passed to you. What's your strategy? 🎶",
    options: [
      "Play that one song everyone knows the words to 🎤",
      "Put on an obscure track to seem mysterious 🎧",
      "Panic and hand it to someone else 😳",
      "Create a quick playlist on the spot 📋",
    ],
  },
  {
    id: 3,
    title:
      "You're in class and your stomach growls super loud. How do you recover your aura? 🍽️",
    options: [
      "Own it and ask if anyone has snacks 🍪",
      "Pretend it was your phone vibrating 📱",
      "Slowly sink under your desk and disappear 🙈",
      "Make a joke about skipping breakfast 😂",
    ],
  },
  {
    id: 4,
    title: "You're at a party and someone asks what your pronouns are.",
    options: [
      "Confidently state them and ask for theirs 💪",
      "Panic and say 'just whatever' 😬",
      "Make a joke about identifying as an attack helicopter ",
      "Pretend you didn't hear and walk away 🚶‍♂️",
    ],
  },
  {
    id: 5,
    title: "Your ex starts dating someone new. How do you cope? 💔",
    options: [
      "Stalk their social media obsessively 👀",
      "Post a thirst trap to show what they're missing 📸",
      "Slide into their new partner's DMs to 'warn' them 📨",
      "Block them both and focus on self-improvement 💪",
    ],
  },
  // {
  //   id: 6,
  //   title: "Do you have a referral code? (Optional)",
  //   inputs: [
  //     {
  //       label: "Referral code",
  //       placeholder: "Enter your referral code here (optional)",
  //       icon: "code-outline",
  //     },
  //   ],
  // },
  // {
  //   id: 7,
  //   title: "Help us grow",
  //   description: "We value your feedback!",
  //   options: [
  //     "Rate us ⭐⭐⭐⭐⭐",
  //     "Leave a review 📝",
  //     "Share with friends 📣",
  //   ],
  // },

  {
    id: 8, // New loading screen
    loading: true,
    loadingMessage: "Analyzing your aura...",
  },
  {
    id: 9,
    title: "Your Aura Ratings",
    description: "We've identified your unique aura type.",
    finalScreen: true,
  },
  {
    id: 10,
    title: "Become your best self",
    description: "Unlock your potential with our premium features!",
    options: [
      { title: "Aura score calculator & tracking", price: "$4.99/week" },
      { title: "Daily self-improvement tasks", price: "$4.99/week" },
    ],
    paywall: true,
  },
];

const FeatureItem = ({ icon, text }) => (
  <View className="flex-row items-center mb-2">
    <Ionicons name={icon} size={24} style={{ marginRight: 8 }} />
    <Text className="text-base font-JakartaMedium text-white">{text}</Text>
  </View>
);

const CustomProgressBar = ({ progress, potentialProgress }) => (
  <View className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
    <View
      className="h-full bg-black rounded-full"
      style={{ width: `${progress}%` }}
    />
    {potentialProgress && (
      <View
        className="h-full bg-green-500 rounded-full absolute top-0 left-0 opacity-50"
        style={{ width: `${potentialProgress}%` }}
      />
    )}
  </View>
);

const OnboardingQuestions = ({ onComplete }) => {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userResponses, setUserResponses] = useState({});
  const [error, setError] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [showDiscountedPaywall, setShowDiscountedPaywall] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [auraAnalysis, setAuraAnalysis] = useState(null);
  const [potentialScores, setPotentialScores] = useState(null);
  const [showPotential, setShowPotential] = useState(false);
  const [loading, setLoading] = useState(false); // New loading state
  const swiperRef = useRef();
  const { user } = useUser();
  const [revenueCatOfferings, setRevenueCatOfferings] = useState([]);
  const [priceString, setPriceString] = useState("");

  // useEffect(() => {
  //   Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG);
  //   Purchases.configure({ apiKey: "appl_MguuVCLMgGQhntOFjBwLPJaSUkJ" });
  //   if (Platform.OS === "ios") {
  //     Purchases.configure({
  //       apiKey: `appl_MguuVCLMgGQhntOFjBwLPJaSUkJ`,
  //     });

  //     async function getOfferings() {
  //       const offerings = await Purchases.getOfferings();

  //       if (offerings) {
  //         const weeklyPriceString =
  //           offerings.current.availablePackages[0].product.pricePerWeekString;
  //         console.log(weeklyPriceString);

  //         if (weeklyPriceString.trim() != "") {
  //           setPriceString(weeklyPriceString);
  //         }
  //         setRevenueCatOfferings(offerings);
  //         console.log("successfully set revenue cat offerings.");
  //       } else {
  //         console.log("no offerings");
  //       }
  //     }

  //     getOfferings();
  //   }
  // }, []);

  // async function handleWeeklyPurchase() {
  //   try {
  //     const offerings = revenueCatOfferings;
  //     if (offerings.current && offerings.current.availablePackages.length > 0) {
  //       const currentOffering = offerings.current;
  //       const purchaserInfo = await Purchases.purchasePackage(
  //         currentOffering.weekly
  //       );
  //       r;
  //       // Purchase successful
  //       console.log("Purchase successful:", purchaserInfo);
  //       const userId = user.id;
  //       // console.log(userId);

  //       const paidStatus = true;

  //       console.log("calling update package api...");

  //       if (userId) {
  //         console.log(`calling update api for ${userId}`);
  //         const response = await fetch(`/(api)/update-user-package/${userId}`, {
  //           method: "PATCH",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({ paid: paidStatus }), // Adjust the payload as needed
  //         });

  //         if (response) {
  //           console.log(`updated paid status successfully.`);
  //           router.replace(`/home`);
  //         }
  //       }

  //       // Handle successful purchase (e.g., update UI, grant access to premium features)
  //     } else {
  //       console.log("No offerings available");
  //       // Handle the case where no offerings are available
  //     }
  //   } catch (e) {
  //     if (e.userCancelled) {
  //       // User cancelled the purchase
  //       console.log("Purchase cancelled by user");
  //       console.log("showing upsell");
  //       // Handle cancelled purchase (e.g., show a message to the user)
  //     } else if (e.code === Purchases.PURCHASE_NOT_ALLOWED_ERROR) {
  //       // Purchase not allowed (e.g., parental controls are turned on)
  //       console.log("Purchase not allowed");
  //       // Handle this case (e.g., show a message to the user)
  //     } else {
  //       // Other errors
  //       console.error("Error during purchase:", e);
  //       // Handle other errors (e.g., network issues, payment problems)
  //     }
  //   }
  // }

  const progressPercentage =
    ((currentQuestionIndex + 1) / questions.length) * 100;

  async function analyzeUserData() {
    setIsAnalyzing(true);
    try {
      const payload = {
        userResponses: userResponses,
      };

      console.log("Analyzing user data...", payload);

      const response = await fetch("/(api)/(openai)/analyze-user-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze user data");
      }

      const result = await response.json();
      console.log("API response:", result);

      // Remove the backticks and "json" from the string
      const cleanedJsonString = result.analysis
        .replace(/```json|```/g, "")
        .trim();

      // Parse the cleaned JSON string
      const parsedAnalysis = JSON.parse(cleanedJsonString);
      console.log("Parsed analysis:", parsedAnalysis);

      setAuraAnalysis(parsedAnalysis.analysis);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } catch (error) {
      console.error("Error analyzing user data:", error);
      setError("Failed to analyze user data. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  }

  const handleNext = async () => {
    const currentQuestion = questions[currentQuestionIndex];

    console.log(currentQuestion);

    if (
      isCurrentQuestionAnswered() ||
      currentQuestion.id === 6 ||
      currentQuestion.id === 7
    ) {
      // Allow skipping referral code question
      setError("");
      if (currentQuestionIndex < questions.length - 1) {
        if (currentQuestion.paywall) {
          console.log("Selected plan:", userResponses[currentQuestion.title]);
          if (!showDiscountedPaywall) {
            setShowDiscountModal(true);
          } else {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
          }
        } else {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
      } else {
        // onComplete();
      }
    } else {
      setError("Please answer the question before proceeding.");
    }

    // Add this block to handle the "Help us grow" screen transition
    if (currentQuestion.id === 7) {
      setCurrentQuestionIndex(currentQuestionIndex + 1); // Move to the loading screen after "Help us grow"
    }
  };

  const handleOptionSelect = (questionTitle, option) => {
    const currentQuestion = questions[currentQuestionIndex];
    setUserResponses((prevResponses) => {
      const currentSelections = prevResponses[questionTitle] || [];
      let updatedSelections;

      if (currentQuestion.multiSelect) {
        updatedSelections = currentSelections.includes(option)
          ? currentSelections.filter((item) => item !== option)
          : [...currentSelections, option];

        if (
          currentQuestion.maxSelect &&
          updatedSelections.length > currentQuestion.maxSelect
        ) {
          return prevResponses;
        }
      } else {
        updatedSelections = [option];
      }

      console.log(`Question "${questionTitle}" answered:`, updatedSelections);
      return {
        ...prevResponses,
        [questionTitle]: updatedSelections,
      };
    });
  };

  const handleInputChange = (questionTitle, inputLabel, value) => {
    setUserResponses((prevResponses) => {
      const updatedResponse = {
        ...prevResponses,
        [questionTitle]: {
          ...(prevResponses[questionTitle] || {}),
          [inputLabel]: value,
        },
      };
      console.log(
        `Question "${questionTitle}" input changed:`,
        updatedResponse[questionTitle]
      );
      return updatedResponse;
    });
  };

  const isCurrentQuestionAnswered = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const response = userResponses[currentQuestion.title];

    if (currentQuestion.options) {
      return response && response.length > 0;
    } else if (currentQuestion.inputs) {
      // Check if the current question is the referral code question (id: 6)
      const isReferralCodeQuestion = currentQuestion.id === 6;
      return (
        response &&
        (!isReferralCodeQuestion || // Allow skipping the referral code question
          Object.keys(response).length <= currentQuestion.inputs.length) &&
        Object.values(response).every((value) => value.trim() !== "")
      );
    }
    return true; // For loading and final screens, consider them always answered
  };

  const handleClaimGift = () => {
    setShowDiscountModal(false);
    setShowDiscountedPaywall(true);
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setUserResponses((prev) => ({
      ...prev,
      [questions[currentQuestionIndex].title]: plan,
    }));
  };

  const generatePotentialScores = () => {
    if (!auraAnalysis) return;

    const newPotentialScores = {};
    Object.entries(auraAnalysis.categories).forEach(([category, data]) => {
      const currentScore = data.rating;
      const maxIncrease = Math.min(98 - currentScore, 20); // Ensure the score doesn't exceed 98
      const increase = Math.min(
        Math.max(12, Math.floor(Math.random() * maxIncrease) + 1),
        98 - currentScore
      ); // Minimum increase of 12, maximum up to total score of 98
      newPotentialScores[category] = currentScore + increase;
    });
    setPotentialScores(newPotentialScores);
    setShowPotential(true);
  };

  const currentQuestion = questions[currentQuestionIndex];

  const updateAuraPoints = async () => {
    if (user) {
      try {
        setLoading(true);

        const totalPoints =
          Math.floor(Math.random() * (2500 - 1500 + 1)) + 1500;

        // Directly update or create aura level tier
        const response = await fetch(
          `/(api)/update-aura-level-tier/${user.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ totalPoints }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update or create aura level tier");
        }

        const data = await response.json();
        console.log("Aura level tier updated or created successfully:", data);

        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        await delay(5000); // Wait for 5 seconds after the response is returned
      } catch (error) {
        console.error("Error updating aura points:", error);
      } finally {
        setLoading(false);
        handleNext();
      }
    }
  };

  useEffect(() => {
    if (currentQuestion.loading) {
      updateAuraPoints();
    }
  }, [currentQuestionIndex, currentQuestion]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-black justify-center items-center">
        <Image
          source={bg} // Update the path to your image
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            resizeMode: "cover",
          }}
        />
        <ActivityIndicator size="large" color="white" />
        <Text className="px-16 text-lg font-JakartaMedium mt-4 text-center text-white">
          {currentQuestion.loadingMessage ||
            "Please wait while we personalize the app for you..."}
        </Text>
      </SafeAreaView>
    );
  }

  if (currentQuestion.finalScreen) {
    return (
      <SafeAreaView className="flex-1 bg-black">
        <Image
          source={bg} // Update the path to your image
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            resizeMode: "cover",
          }}
        />
        <StatusBar barStyle="auto" />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View intensity={10} tint="light" style={{ flex: 1 }}>
            <View className="p-4">
              <View className="w-full h-2 bg-[#242424] rounded-full mb-4">
                <View
                  className="h-full bg-indigo-500 rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                />
              </View>
              <Text className="text-2xl font-JakartaBold mb-4 text-white">
                Your analysis is ready. Ready to level up your aura?
              </Text>
              <Image
                source={analysis}
                style={{ width: "100%", height: undefined, aspectRatio: 1 }} // Adjust aspectRatio as needed
                resizeMode="contain" // Use 'contain' to maintain aspect ratio without cropping
              />
            </View>
          </View>

          <View className="px-5 pb-5">
            <View className="flex-row justify-between mt-5">
              <CustomButton
                title="Get Started"
                onPress={handleNext}
                className="flex-1 bg-indigo-500"
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (currentQuestion.paywall) {
    return (
      <SafeAreaView className="flex-1 bg-black">
        <Image
          source={bg} // Update the path to your image
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            resizeMode: "cover",
          }}
        />
        <View className="flex-1 justify-between">
          <ScrollView className="flex-1 py-12 mx-5">
            <View className="">
              <Text className="text-2xl font-JakartaBold mb-5 text-white">
                Improve your aura today
              </Text>
              <View className="pt-2">
                <View className="flex-row items-center mb-2">
                  <Ionicons name="checkmark-circle" size={20} color="white" />
                  <Text className=" font-JakartaRegular text-white ml-2">
                    Calculate and track your aura points
                  </Text>
                </View>
                <View className="flex-row items-center mb-2">
                  <Ionicons name="checkmark-circle" size={20} color="white" />
                  <Text className=" font-JakartaRegular text-white ml-2">
                    Earn aura points through daily challenges
                  </Text>
                </View>
                <View className="flex-row items-center mb-2">
                  <Ionicons name="checkmark-circle" size={20} color="white" />
                  <Text className=" font-JakartaRegular text-white ml-2">
                    Personalized AI Aura Coaches and tasks
                  </Text>
                </View>
                <View className="flex-row items-center mb-2">
                  <Ionicons name="checkmark-circle" size={20} color="white" />
                  <Text className="font-JakartaRegular text-white ml-2">
                    Become the main character in any room
                  </Text>
                </View>
              </View>
            </View>
            <View className="mt-10">
              <Text className="text-white text-2xl font-semibold">
                Some of our reviews
              </Text>
              <View className="mt-5 space-y-2">
                <Text className="text-white text-lg font-semibold">
                  100% recommended!
                </Text>
                <View className="flex-row">
                  {[...Array(5)].map((_, index) => (
                    <Ionicons
                      key={index}
                      name="star"
                      size={24}
                      color="yellow"
                    />
                  ))}
                </View>
                <Text className="text-white ">
                  Gained my friends' respect after using this app. 100%
                  recommend!
                </Text>
              </View>
              <View
                style={{
                  height: 1,
                  backgroundColor: "stone",
                  marginVertical: 25,
                }}
              />
              <View className="space-y-2">
                <Text className="text-white text-lg font-semibold">
                  This is my new favourite app
                </Text>
                <View className="flex-row">
                  {[...Array(5)].map((_, index) => (
                    <Ionicons
                      key={index}
                      name="star"
                      size={24}
                      color="yellow"
                    />
                  ))}
                </View>
                <Text className="text-white ">
                  Been using it for a week and I can already feel my life
                  improving, thanks to whoever made this!
                </Text>
              </View>
            </View>

            <View className="mt-5"></View>
          </ScrollView>

          <Text className="text text-center font-JakartaRegular mb-2 text-white">
            {priceString && priceString}/week
          </Text>
          <View className="flex-row justify-between mt-2 mx-5 bottom-0">
            <CustomButton
              title={`Get Started Today`}
              // onPress={() => handleWeeklyPurchase()}
              onPress={() => router.push(`/home`)}
              className="flex-1 bg-[#8400FF]"
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-black h-full">
      <Image
        source={bg} // Update the path to your image
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          resizeMode: "cover",
        }}
      />
      <ScrollView
        className="flex-1 px-5 py-10"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="w-full h-2 bg-[#242424] rounded-full mb-4">
          <View
            className="h-full bg-indigo-500 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          />
        </View>
        <Text className="text-2xl font-JakartaBold mb-3 text-white">
          {currentQuestion.title}
        </Text>
        <Text className="text-md font-JakartaRegular mb-5 text-white">
          {currentQuestion.description}
        </Text>

        {currentQuestion.options && (
          <View>
            {currentQuestion.options.map((option) => (
              <TouchableOpacity
                key={option}
                onPress={() =>
                  handleOptionSelect(currentQuestion.title, option)
                }
                className={`w-full bg-[#242424] rounded-2xl p-3 mb-3 ${
                  (userResponses[currentQuestion.title] || []).includes(option)
                    ? "border border-indigo-500"
                    : ""
                }`}
              >
                <Text
                  className={`text-center text-lg font-JakartaMedium ${userResponses[currentQuestion.title]?.includes(option) ? "text-white" : "text-white"}`}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {currentQuestion.inputs && (
          <View>
            {currentQuestion.inputs.map((input) => (
              <InputField
                key={input.label}
                label={input.label}
                placeholder={input.placeholder}
                placeholderTextColor="#888888"
                icon={icons[input.icon]}
                value={
                  userResponses[currentQuestion.title]?.[input.label] || ""
                }
                className="bg-[#242424] text-white"
                onChangeText={(value) =>
                  handleInputChange(currentQuestion.title, input.label, value)
                }
              />
            ))}
          </View>
        )}

        {error !== "" && (
          <Text className="text-red-300 text-center font-medium mt-2 mb-2 text-white">
            {error}
          </Text>
        )}

        {/* Progress Bar */}
      </ScrollView>
      <View className="px-5 pb-5">
        <View className="flex-row justify-between mt-5">
          <CustomButton
            title={
              currentQuestionIndex === questions.length - 1
                ? "Get Started"
                : "Next"
            }
            onPress={handleNext}
            className="flex-1 bg-[#8400FF]"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingQuestions;
