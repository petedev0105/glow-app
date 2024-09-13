import glowTitle from '@/assets/images/glow-title.png';
import { onboardingQuestionsList, styles } from '@/constants/onboarding';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
  Alert,
  Image,
  ImageStyle,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// Compress the image if needed
const compressImage = async (uri: string) => {
  try {
    const fileInfo = await FileSystem.getInfoAsync(uri);

    if ('size' in fileInfo && fileInfo.size > 1000000) {
      const manipResult = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 1000 } }],
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
      );
      return manipResult.uri;
    } else {
      return uri;
    }
  } catch (error) {
    console.error('Error compressing image:', error);
    return uri;
  }
};

// Handle camera capture permissions and selfie capture
const handleCameraCapture = async () => {
  const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
  if (!permissionResult.granted) {
    Alert.alert('Permission to access camera is required!');
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
    Alert.alert('Permission to access gallery is required!');
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
    router.replace({
      pathname: '/(auth)/next-screen',
      params: { imageUri },
    });
  } catch (error) {
    Alert.alert('Error uploading image');
  }
};

// Show options to take a selfie or choose from the library
const showImagePickerOptions = () => {
  Alert.alert(
    'Upload Image',
    'Choose an option',
    [
      { text: 'Take a Selfie', onPress: handleCameraCapture },
      { text: 'Choose Existing Image', onPress: handleGalleryUpload },
      { text: 'Cancel', style: 'cancel' },
    ],
    { cancelable: true }
  );
};

const NextScreen = () => {
  const { imageUri } = useLocalSearchParams();

  return (
    <SafeAreaView className='flex h-full bg-white'>
      <StatusBar barStyle='dark-content' backgroundColor='#6a51ae' />

      <View className='flex items-center mb-10'>
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
              style={{ width: '100%', height: '100%', borderRadius: 10 }}
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
            onPress={() => router.replace('/')}
          >
            <Text style={styles.buttonText} onPress={() => router.replace('/')}>
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NextScreen;
