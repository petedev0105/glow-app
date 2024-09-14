import { useUser } from '@clerk/clerk-expo';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import Swiper from 'react-native-swiper';
import OnboardingQuestions from '../../components/OnboardingQuestions';

const Home = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  // const { showQuestions, setShowQuestions } = useQuestionStore();
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [authCompleted, setAuthCompleted] = useState(false); // To track if authentication is finished
  const navigation = useNavigation();

  useEffect(() => {
    if (isLoaded) {
      // setShowQuestions(isSignedIn);
      setIsLoading(false);
      // TODO REMOVE THIS, TEMPORARY
      router.replace('/(auth)/results-screen');
    }
  }, [isLoaded]);

  // const handleOnboardingComplete = useCallback(() => {
  //   setShowQuestions(true);
  // }, []);

  // Loading screen if still loading
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#8400FF' />
      </View>
    );
  }

  return <OnboardingQuestions />;
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
