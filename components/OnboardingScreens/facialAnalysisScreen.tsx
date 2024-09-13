import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import { onboardingQuestionsList, styles } from '../../constants/onboarding';

export const FacialAnalysisScreen = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [image, setImage] = useState<string | null>(null);

  // Request camera permissions
  const requestCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
    if (status !== 'granted') {
      Alert.alert('Enable camera access to take a selfie!');
    }
  };

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

  // Handle taking a selfie
  const takeSelfie = async () => {
    await requestCameraPermission();
    if (hasPermission) {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
      if (!result.canceled) {
        const compressedUri = await compressImage(result.assets[0].uri);
        setImage(compressedUri);
        handleImageUpload(compressedUri);
      }
    }
  };

  // Handle choosing an image from the library
  const pickImageFromLibrary = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      const compressedUri = await compressImage(result.assets[0].uri);
      setImage(compressedUri);
      handleImageUpload(compressedUri);
    }
  };

  // Handle image upload to the next screen
  const handleImageUpload = async (imageUri: string) => {
    try {
      router.replace({
        pathname: '/(auth)/next-screen',
        params: { imageUri, hasPermission: hasPermission?.toString() },
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
        { text: 'Take a Selfie', onPress: takeSelfie },
        { text: 'Choose Existing Image', onPress: pickImageFromLibrary },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{onboardingQuestionsList[10].title}</Text>
      <Text style={styles.subtitleCaption}>
        {onboardingQuestionsList[10].subtitle}
      </Text>

      <View style={styles.contentContainer}>
        <View
          style={{
            ...styles.imagePlaceholder,
            marginVertical: 40,
            width: 300,
            height: 300,
          }}
        >
          <Image
            source={require('../../assets/images/model.png')}
            style={{ width: '100%', height: '100%', borderRadius: 10 }}
          />
        </View>
      </View>

      <View style={styles.footerContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={showImagePickerOptions}
        >
          <Text style={styles.buttonText}>Upload or take a selfie</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
