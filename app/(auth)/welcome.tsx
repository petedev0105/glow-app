import OnboardingQuestions, {
  onboardingQuestionsScreens,
} from '@/components/OnboardingQuestions';
import { useQuestionStore } from '@/store/onboardingStore';
import { useUser } from '@clerk/clerk-expo';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native';
import Swiper from 'react-native-swiper';
import { onboardingQuestionsList } from '../../constants/onboarding';

const Home = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const { showQuestions, setShowQuestions } = useQuestionStore();
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  // Determine if the current slide is the last one
  const isLastSlide = activeIndex === onboardingQuestionsList.length - 1;

  useEffect(() => {
    if (isLoaded) {
      setShowQuestions(isSignedIn);
      setIsLoading(false);
    }
  }, [isLoaded, isSignedIn]);

  const handleOnboardingComplete = useCallback(() => {
    setShowQuestions(true);
  }, []);

  const handleQuestionsComplete = useCallback((responses: any) => {
    console.log('User responses:', responses);
    setResponses(responses);
    router.replace('/(auth)/sign-up');
  }, []);

  // Loading screen if still loading
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#8400FF' />
      </View>
    );
  }

  // If user has questions to answer
  if (showQuestions) {
    return <OnboardingQuestions />;
  }

  const goToNextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(1);
    }
  };

  return (
    <View className='flex h-full bg-black'>
      <StatusBar barStyle='light-content' />
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={<View className='w-0' />}
        activeDot={<View className='w-0' />}
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {/* Render each individual onboarding screen component */}
        {onboardingQuestionsScreens.map((ScreenComponent, index) => (
          <ScreenComponent
            key={index}
            navigation={navigation}
            onNext={goToNextSlide}
          />
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});

export default Home;
