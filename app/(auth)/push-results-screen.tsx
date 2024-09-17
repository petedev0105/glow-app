import LoadingSpinner from '@/components/LoadingSpinner';
import { images } from '@/constants';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

const PushResultsScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  // PUSH SCANS TO DB AND WHEN DONE THEN SET NO NEED TO SET LOADING TO FALES, JUST REROUTE
  useEffect(() => {
    const pushScansToDB = () => {
      router.replace('/(home)');
    };

    pushScansToDB();
  }, []);

  if (isLoading) {
    return <LoadingSpinner bgImg={images.homeBgLarger}></LoadingSpinner>;
  }

  return <View></View>;
};

export default PushResultsScreen;
