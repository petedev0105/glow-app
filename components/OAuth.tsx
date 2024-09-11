import { useOAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { Alert, Image, Text, View } from "react-native";

import CustomButton from "@/components/CustomButton";
import { icons } from "@/constants";
import { googleOAuth } from "@/lib/auth";
import { useQuestionStore } from "@/store/onboardingStore"; // Import the store

const OAuth = () => {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const { setShowQuestions } = useQuestionStore();

  const handleGoogleSignIn = async () => {
    const result = await googleOAuth(startOAuthFlow);

    console.log("google auth result: ", result);

    if (result.code === "success") {
      // Alert.alert("Success", "Session exists. Redirecting to home screen.");
      // router.replace("/(root)/(tabs)/home");
      setShowQuestions(true);
    }

    // Alert.alert(result.success ? "Success" : "Error", result.message);
  };

  return (
    <View>
      <View className="flex flex-row justify-center items-center mt-4 gap-x-3"></View>

      <CustomButton
        title="Log In with Google"
        className="mt-5 w-full shadow-none border border-white"
        IconLeft={() => (
          <Image
            source={icons.google}
            resizeMode="contain"
            className="w-5 h-5 mx-2"
          />
        )}
        // bgVariant="outline"
        textVariant="secondary"
        onPress={handleGoogleSignIn}
      />
    </View>
  );
};

export default OAuth;
