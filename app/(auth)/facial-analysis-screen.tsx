import { images } from "@/constants";
import { onboardingQuestionsList, styles } from "@/constants/onboarding";
import { useImageStore } from "@/store/imageStore";
import { useUser } from "@clerk/clerk-expo";
import * as FileSystem from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  ImageStyle,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const FacialAnalysisScreen = () => {
  const [image, setImage] = useState<string | null>(null);
  const { user } = useUser();
  // compress image
  const compressImage = async (uri: string) => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(uri);

      if ("size" in fileInfo && fileInfo.size > 1000000) {
        const manipResult = await ImageManipulator.manipulateAsync(
          uri,
          [
            { resize: { width: 1000 } },
            { rotate: 180 },
            { flip: ImageManipulator.FlipType.Vertical },
          ],
          { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
        );
        return manipResult.uri;
      } else {
        return uri;
      }
    } catch (error) {
      console.error("Error compressing image:", error);
      return uri;
    }
  };

  async function handleGetScore() {
    if (image) {
      console.log(image);
      await handleImageUpload(image);
      router.replace("/(auth)/results-screen");

      // try {
      //   console.log("calling image analysis api");
      //   const response = await fetchAPI("/(api)/(openai)/glowscore", {
      //     method: "POST",
      //     body: JSON.stringify({ text: "", imageUri: image }),
      //   });

      //   console.log(response);
      // } catch (error) {
      //   console.log(error);
      // }
    }
  }

  // handle camera capture permissions and selfie capture
  const handleCameraCapture = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission to access camera is required!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      cameraType: ImagePicker.CameraType.front,
    });

    if (!result.canceled) {
      const compressedUri = await compressImage(result.assets[0].uri);
      // setImage(compressedUri);
      // handleImageUpload(compressedUri);
      const base64 = await FileSystem.readAsStringAsync(compressedUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setImage(`data:image/jpeg;base64,${base64}`);
    }
  };

  // Handle gallery image upload
  const handleGalleryUpload = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission to access gallery is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const compressedUri = await compressImage(result.assets[0].uri);
      // setImage(compressedUri);
      // handleImageUpload(compressedUri);
      const base64 = await FileSystem.readAsStringAsync(compressedUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setImage(`data:image/jpeg;base64,${base64}`);
    }
  };

  const handleImageUpload = async (imageUri: string) => {
    if (!user || !user.id) {
      console.error("User is not logged in");
      return;
    }

    try {
      // store image URL in Zustand store
      useImageStore.getState().clearImages();
      useImageStore.getState().addImage(imageUri);
      console.log(imageUri);

      // router.replace("/(auth)/next-screen");
    } catch (error: any) {
      console.error("Error uploading image:", error);
      Alert.alert("Error uploading image", error.message);
    }
  };

  const showImagePickerOptions = () => {
    Alert.alert(
      "Upload Image",
      "Choose an option",
      [
        { text: "Take a Selfie", onPress: handleCameraCapture },
        { text: "Choose Existing Image", onPress: handleGalleryUpload },
        { text: "Cancel", style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  return (
    <ImageBackground
      source={images.screenBg}
      style={localStyles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={localStyles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#6a51ae" />

        <View className="flex items-center mb-10">
          <Image source={images.glowTitle} style={styles.logo as ImageStyle} />
        </View>

        <View style={styles.container}>
          <Text style={styles.title}>{onboardingQuestionsList[10].title}</Text>
          <Text style={styles.subtitleCaption}>
            {onboardingQuestionsList[10].subtitle}
          </Text>

          <View style={styles.contentContainer}>
            <View style={styles.snapPlaceholder}>
              {image ? (
                <Image
                  source={{ uri: image }}
                  style={{ width: "100%", height: "100%", borderRadius: 10 }}
                />
              ) : (
                <Image
                  source={require("../../assets/images/model.png")}
                  style={{ width: "100%", height: "100%", borderRadius: 10 }}
                />
              )}
            </View>
          </View>

          <View style={styles.footerContainer}>
            {image && (
              <TouchableOpacity
                style={[styles.button, { marginBottom: 10 }]}
                onPress={() => {
                  setImage(null);
                  useImageStore.getState().clearImages();
                }}
              >
                <Text style={[styles.buttonText, { color: "#333" }]}>
                  Choose Another
                </Text>
              </TouchableOpacity>
            )}
            {image ? (
              <TouchableOpacity
                style={styles.button}
                // onPress={() => {
                //   /* Add navigation logic here */
                //   // console.log("continue button pressed");
                //   // router.push("/(auth)/results-screen");

                // }}
                onPress={handleGetScore}
              >
                <Text style={styles.buttonText}>Continue</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.button}
                onPress={showImagePickerOptions}
              >
                <Text style={styles.buttonText}>Upload or take a selfie</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const localStyles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "transparent",
  },
});

export default FacialAnalysisScreen;
