import LoadingSpinner from '@/components/LoadingSpinner';
import { images } from '@/constants';
import { router } from 'expo-router';
import React, { useEffect } from 'react';

const PushResultsScreen = () => {
  // PUSH SCANS TO DB AND WHEN DONE THEN SET NO NEED TO SET LOADING TO FALES, JUST REROUTE
  useEffect(() => {
    const pushScansToDB = () => {
      const timer = setTimeout(() => {}, 5000);
      router.replace('/(home)');
    };

    pushScansToDB();
  }, []);

  return <LoadingSpinner bgImg={images.homeBgLarger}></LoadingSpinner>;
};

export default PushResultsScreen;
