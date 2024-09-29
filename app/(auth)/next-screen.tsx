import glowTitle from "@/assets/images/glow-title.png";
import { onboardingQuestionsList, styles } from "@/constants/onboarding";
import { useImageStore } from "@/store/imageStore";
import { useUser } from "@clerk/clerk-expo";
import * as FileSystem from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useEffect } from "react";
import {
  Alert,
  Image,
  ImageStyle,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Compress the image if needed
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

// Handle camera capture permissions and selfie capture
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
    await handleImageUpload(compressedUri);
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
    await handleImageUpload(compressedUri);
  }
};

// Handle image upload to Neon DB
const handleImageUpload = async (imageUri: string) => {
  try {
    useImageStore.getState().clearImages();
    useImageStore.getState().addImage(imageUri);

    // router.replace('/(auth)/next-screen');
  } catch (error) {
    Alert.alert("Error uploading image");
  }
};

// Show options to take a selfie or choose from the library
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

const handleSubmitImage = async ({
  imageUri,
  user,
}: {
  imageUri: string;
  user: any;
}) => {
  if (!user || !user.id) {
    console.error();
    return;
  }

  try {
    // // Convert the local file to a buffer, or use the correct format for S3.
    // const response = await fetch(imageUri);
    // const blob = await response.blob();

    // const params = {
    //   Bucket: 'glow-snaps',
    //   Key: `${user.id}/${Date.now()}-image.jpg`,
    //   Body: blob,
    //   ContentType: 'image/jpeg', // Change based on your file type
    //   ACL: 'public-read', // Ensure the image is publicly accessible
    // };

    // // Upload image to S3
    // const uploadResult = await s3Bucket.upload(params).promise();

    // // Get the S3 URL of the uploaded image
    // const imageUrl = uploadResult.Location;
    // Alert.alert('FRRR', imageUrl);

    router.replace("/(auth)/results-screen");
  } catch (error) {
    console.error("Error uploading image:", error);
    Alert.alert("Error uploading image");
  }
};

const NextScreen = () => {
  // const { imageUri } = useLocalSearchParams();
  const { user } = useUser();
  const images = useImageStore();
  // const imageUri = storeImages[0];

  const imageUri = "";

  useEffect(() => {}, [images]);

  return (
    <SafeAreaView className="flex h-full bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#6a51ae" />

      <View className="flex items-center mb-10">
        <Image source={glowTitle} style={styles.logo as ImageStyle} />
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>{onboardingQuestionsList[10].title}</Text>
        <Text style={styles.subtitleCaption}>
          {onboardingQuestionsList[10].subtitle}
        </Text>

        <View style={styles.contentContainer}>
          <View style={styles.snapPlaceholder}>
            <Image
              source={{ uri: imageUri as string }}
              style={{ width: "100%", height: "100%", borderRadius: 10 }}
            />
          </View>
        </View>

        <View style={styles.footerContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={showImagePickerOptions}
          >
            <Text style={styles.buttonText}>Take another or reupload</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleSubmitImage({ imageUri, user })}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NextScreen;
function useUserStore() {
  throw new Error("Function not implemented.");
}
