import CustomButton from '@/components/CustomButton';
import { useUser } from '@clerk/clerk-expo';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';

// const FeatureItem = ({ icon, text }) => (
//   <View className='flex-row items-center mb-2'>
//     <Ionicons name={icon} size={24} style={{ marginRight: 8 }} />
//     <Text className='text-base font-JakartaMedium text-white'>{text}</Text>
//   </View>
// );

// const CustomProgressBar = ({ progress, potentialProgress }) => (
//   <View className='w-full h-2 bg-gray-200 rounded-full overflow-hidden'>
//     <View
//       className='h-full bg-black rounded-full'
//       style={{ width: `${progress}%` }}
//     />
//     {potentialProgress && (
//       <View
//         className='h-full bg-green-500 rounded-full absolute top-0 left-0 opacity-50'
//         style={{ width: `${potentialProgress}%` }}
//       />
//     )}
//   </View>
// );

import OAuth from '@/components/OAuth';
import { useQuestionStore } from '@/store/onboardingStore';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import { useCallback } from 'react';
import { AgeScreen } from './OnboardingScreens/ageScreen';
import { AuthScreen } from './OnboardingScreens/authScreen';
import { BeautyGoalsScreen } from './OnboardingScreens/beautyGoalsScreen';
import { LeaveRatingScreen } from './OnboardingScreens/leaveRatingScreen';
import { MakeUpPreferencesScreen } from './OnboardingScreens/makeupPreferencesScreen';
import { ProductPreferencesScreen } from './OnboardingScreens/productPreferencesScreen';
import { ReferralScreen } from './OnboardingScreens/referralScreen';
import { SkinConcernsScreen } from './OnboardingScreens/skinConcernsScreen';
import { TrustedScreen } from './OnboardingScreens/trustedScreen';

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

  // Last slide check
  const isLastSlide = activeIndex === onboardingQuestionsScreens.length - 1;

  useEffect(() => {
    if (isLoaded) {
      setShowQuestions(isSignedIn);
      setIsLoading(false);
    }
  }, [isLoaded, isSignedIn, setShowQuestions]);

  const handleSwipeNext = () => {
    swiperRef.current?.scrollBy(1);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#8400FF' />
      </View>
    );
  }

  const handleQuestionsComplete = useCallback(() => {
    setShowQuestions(true);
  }, []);

  const handleOnboardingComplete = useCallback(() => {
    router.replace('/(auth)/sign-up'); // Redirect to sign-up after onboarding
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#8400FF' />
      </View>
    );
  }

  const goToNextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(1);
    }
  };

  if (showQuestions) {
    return (
      <SafeAreaView className='flex h-full bg-black'>
        <Swiper
          ref={swiperRef}
          loop={false}
          dot={
            <View className='w-[32px] h-[4px] mx-1 bg-stone-200 rounded-full ' />
          }
          activeDot={
            <View className='w-[32px] h-[4px] mx-1 bg-[#8400FF] rounded-full' />
          }
          onIndexChanged={(index) => setActiveIndex(index)}
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

        <View className='justify-end px-5'>
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
        </View>
      </SafeAreaView>
    );
  }

  return null; // Or return a placeholder or loader while questions are hidden
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});

export default OnboardingQuestions;
