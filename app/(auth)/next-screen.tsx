import glowTitle from '@/assets/images/glow-title.png';
import { onboardingQuestionsList, styles } from '@/constants/onboarding';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
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

const NextScreen = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const { imageUri, hasPermission: hasPermissionParam } =
    useLocalSearchParams();

  useEffect(() => {
    setHasPermission(hasPermissionParam === 'true');
  }, [hasPermissionParam]);

  // Request camera permissions
  const requestCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
    if (status !== 'granted') {
      Alert.alert('Enable camera access to take a selfie!');
    }
  };

  // Handle taking a selfie
  const takeSelfie = async () => {
    await requestCameraPermission();
    if (hasPermission) {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });
      if (!result.canceled) {
        await handleImageUpload(result.assets[0].uri);
      }
    }
  };

  // Handle choosing an image from the library
  const pickImageFromLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) {
      await handleImageUpload(result.assets[0].uri);
    }
  };

  // Handle image upload to Neon DB
  const handleImageUpload = async (imageUri: string) => {
    try {
      // TODO: SEND TO S3 BUCKET WITH USER ID AS FOLDER NAME
      router.replace('/');

      // const response = await uploadImageToNeonDB(imageUri);
      // if (response.success) {
      //   Alert.alert('Image uploaded successfully');
      //   onNext(); // Proceed to the next step
      // } else {
      //   Alert.alert('Failed to upload image');
      // }
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
        {
          text: 'Take a Selfie',
          onPress: takeSelfie,
        },
        {
          text: 'Choose Existing Image',
          onPress: pickImageFromLibrary,
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

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
            // onPress={showImagePickerOptions}
          >
            <Text style={styles.buttonText}>Take another or reupload</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            // onPress={showImagePickerOptions}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NextScreen;
