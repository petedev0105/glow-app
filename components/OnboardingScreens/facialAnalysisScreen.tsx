import { useImageStore } from '@/store/imageStore';
import { useUser } from '@clerk/clerk-expo';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import { onboardingQuestionsList, styles } from '../../constants/onboarding';

export const FacialAnalysisScreen = () => {
  const [image, setImage] = useState<string | null>(null);
  const { user } = useUser();
  // compress image
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

  // handle camera capture permissions and selfie capture
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
      setImage(compressedUri);
      handleImageUpload(compressedUri);
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
      setImage(compressedUri);
      handleImageUpload(compressedUri);
    }
  };

  const handleImageUpload = async (imageUri: string) => {
    if (!user || !user.id) {
      console.error('User is not logged in');
      return;
    }

    try {
      // store image URL in Zustand store
      useImageStore.getState().clearImages();
      useImageStore.getState().addImage(imageUri);

      router.replace('/(auth)/next-screen');
    } catch (error: any) {
      console.error('Error uploading image:', error);
      Alert.alert('Error uploading image', error.message);
    }
  };

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{onboardingQuestionsList[10].title}</Text>
      <Text style={styles.subtitleCaption}>
        {onboardingQuestionsList[10].subtitle}
      </Text>

      <View style={styles.contentContainer}>
        <View style={styles.snapPlaceholder}>
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
