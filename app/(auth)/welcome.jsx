import { router } from "expo-router";
import { useEffect, useRef, useState, useCallback } from "react";
import { Image, Text, View, StatusBar, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import OnboardingQuestions from "@/components/OnboardingQuestions";
import CustomButton from "@/components/CustomButton";
import { onboarding } from "@/constants";
import { StyleSheet } from "react-native";
import OAuth from "@/components/OAuth";
import { useQuestionStore } from "@/store/onboardingStore";
import { useUser } from "@clerk/clerk-expo";

const Home = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const { showQuestions, setShowQuestions } = useQuestionStore();
  const swiperRef = useRef();
  const [activeIndex, setActiveIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const isLastSlide = activeIndex === onboarding.length - 1;

  useEffect(() => {
    if (isLoaded) {
      setShowQuestions(isSignedIn);
      setIsLoading(false);
    }
  }, [isLoaded, isSignedIn]);

  const handleOnboardingComplete = useCallback(() => {
    setShowQuestions(true);
  }, []);

  const handleQuestionsComplete = useCallback((responses) => {
    console.log("User responses:", responses);
    setResponses(responses);
    router.replace("/(auth)/sign-up");
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8400FF" />
      </View>
    );
  }

  if (showQuestions) {
    return <OnboardingQuestions onComplete={handleQuestionsComplete} />;
  }

  return (
    <SafeAreaView className="flex h-full bg-black">
      <StatusBar barStyle="auto" />
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className="w-[32px] h-[4px] mx-1 bg-stone-200 rounded-full " />
        }
        activeDot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#8400FF] rounded-full" />
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          <View key={item.id} className="flex items-center justify-center mx-3">
            <Image
              source={item.image}
              resizeMode="contain"
              className="w-full"
            />
            <View className="flex flex-col items-center justify-center w-full mt-10">
              <Text className="text-white text-3xl font-bold text-center">
                {item.title}
              </Text>
              <Text className="text-md font-JakartaSemiBold text-center text-[#858585] mx-10 mt-3">
                {item.description}
              </Text>
            </View>
          </View>
        ))}
      </Swiper>

      <View className="justify-end px-5">
        <View className="w-full mb-5">
          {!isLastSlide && (
            <CustomButton
              title="Next"
              onPress={() => swiperRef.current?.scrollBy(1)}
              className="bg-[#8400FF]"
            />
          )}
          {isLastSlide && <OAuth />}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
});

export default Home;
