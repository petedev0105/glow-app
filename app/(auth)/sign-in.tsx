import { useSignIn } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { useCallback, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  View,
  StatusBar,
  SafeAreaView,
} from "react-native";

import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import trophy from "../../assets/images/trophy.png";

const SignIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(root)/(tabs)/home");
      } else {
        console.log(JSON.stringify(signInAttempt, null, 2));
        Alert.alert("Error", "Log in failed. Please try again.");
      }
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors[0].longMessage);
    }
  }, [isLoaded, form]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1  py-10">
        <View>
          <Image className="" source={trophy} />
        </View>

        <View className="pt-10">
          <Text className="text-2xl text-center font-JakartaBold">
            Log in to Aura
          </Text>
          <Text className=" text-center mx-24 text-stone-500 mt-3">
            Get started with your aura improvement journey
          </Text>
        </View>
        <View className="flex-row justify-between mx-auto">
          <OAuth />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
