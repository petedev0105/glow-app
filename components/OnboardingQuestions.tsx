import glowTitle from "@/assets/images/glow-title.png";
import { useQuestionStore } from "@/store/onboardingStore";
import { useUser } from "@clerk/clerk-expo";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ImageStyle,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import { styles } from "../constants/onboarding";
import { AgeScreen } from "./OnboardingScreens/ageScreen";
import { AuthScreen } from "./OnboardingScreens/authScreen";
import { BeautyGoalsScreen } from "./OnboardingScreens/beautyGoalsScreen";
import { LeaveRatingScreen } from "./OnboardingScreens/leaveRatingScreen";
import { MakeUpPreferencesScreen } from "./OnboardingScreens/makeupPreferencesScreen";
import { ProductPreferencesScreen } from "./OnboardingScreens/productPreferencesScreen";
import { ReferralScreen } from "./OnboardingScreens/referralScreen";
import { SkinConcernsScreen } from "./OnboardingScreens/skinConcernsScreen";
import { TrustedScreen } from "./OnboardingScreens/trustedScreen";

export const initialiseScreens = [TrustedScreen, ReferralScreen, AuthScreen];

export const onboardingQuestionsScreens = [
  TrustedScreen,
  ReferralScreen,
  AuthScreen,
  AgeScreen,
  BeautyGoalsScreen,
  SkinConcernsScreen,
  ProductPreferencesScreen,
  MakeUpPreferencesScreen,
  LeaveRatingScreen,
];

const OnboardingQuestions = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const { showQuestions, setShowQuestions } = useQuestionStore();
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Last slide check
  const isLastSlide = activeIndex === onboardingQuestionsScreens.length - 1;

  // useEffect(() => {
  //   if (isLoaded) {
  //     setShowQuestions(isSignedIn);
  //     setIsLoading(false);
  //   }
  // }, [isLoaded, isSignedIn]);

  const handleSwipeNext = () => {
    swiperRef.current?.scrollBy(1);
  };

  if (isLoading) {
    return (
      <View style={localStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#8400FF" />
      </View>
    );
  }

  const handleQuestionsComplete = useCallback(() => {
    setShowQuestions(true);
  }, []);

  const indexChanged = (index: number) => {
    console.log(index);
  };

  const handleOnboardingComplete = useCallback(() => {
    router.replace("/(auth)/sign-up"); // Redirect to sign-up after onboarding
  }, []);

  if (isLoading) {
    return (
      <View style={localStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#8400FF" />
      </View>
    );
  }

  const goToNextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(1);
    }
  };

  const handleOnIndexChanged = (index: number) => {
    setActiveIndex(index);
  };

  // if (showQuestions) {
  return (
    <SafeAreaView className="flex h-full bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#6a51ae" />

      <View className="flex items-center mb-10">
        <Image source={glowTitle} style={styles.logo as ImageStyle} />
      </View>

      <Swiper
        ref={swiperRef}
        showsPagination={false}
        loop={false}
        // onIndexChanged={(index) => handleOnIndexChanged(index)}
      >
        {onboardingQuestionsScreens.map((ScreenComponent, index) => (
          <ScreenComponent
            key={index}
            navigation={navigation}
            onNext={goToNextSlide}
            onAuthComplete={null}
          />
        ))}
      </Swiper>

      {/* <View className='justify-end px-5'>
          <View className='w-full mb-5'>
            {!isLastSlide ? (
              <CustomButton
                title='Next'
                onPress={handleSwipeNext}
                className='bg-[#8400FF]'
              />
            ) : (
              <OAuth /> // Show OAuth (Google/Facebook sign-in) on the last screen
            )}
          </View>
        </View> */}
    </SafeAreaView>
  );
  // return null; // Or return a placeholder or loader while questions are hidden
};

const localStyles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
});

export default OnboardingQuestions;
