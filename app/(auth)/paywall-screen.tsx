import { images } from '@/constants';
import { useImageStore } from '@/store/imageStore';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Animated,
  Easing,
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// revenue cat hook
import { useRevenueCat } from '@/hooks/useRevenueCat';
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const PaywallScreen = () => {
  const [activeTab, setActiveTab] = useState('Ratings');
  const insets = useSafeAreaInsets();
  const [unlockBtnAnimatedValue] = useState(new Animated.Value(0));
  const storeImages = useImageStore((state) => state.images);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const percentile = 70; // Dummy percentile value

  const navigation = useNavigation();

  const { priceString, revenueCatOfferings, error, handleWeeklyPurchase } =
    useRevenueCat();

  useEffect(() => {
    const animateGradient = () => {
      Animated.loop(
        Animated.timing(unlockBtnAnimatedValue, {
          toValue: 1,
          duration: 4000,
          easing: Easing.linear,
          useNativeDriver: false,
        })
      ).start();
    };

    animateGradient();
  }, [unlockBtnAnimatedValue]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  const animatedStartX = unlockBtnAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const animatedEndX = unlockBtnAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  return (
    <ImageBackground
      source={images.paywallBg}
      style={localStyles.background}
      resizeMode='cover'
    >
      <SafeAreaView style={localStyles.safeArea}>
        <StatusBar barStyle='dark-content' backgroundColor='#6a51ae' />

        <Image source={images.paywallReviewImg} />

        <TouchableOpacity
          style={[
            localStyles.buttonContainer,
            { paddingBottom: insets.bottom },
          ]}
          // TODO CHANGE ROUTE TO PAYWALL SCREEN INSTEAD AFTER THEY CLICK UNLOCK
          onPress={handleWeeklyPurchase}
        >
          <AnimatedLinearGradient
            colors={['#da70d6', '#7b68ee', '#87cefa']}
            start={{ x: animatedStartX, y: 0 }}
            end={{ x: animatedEndX, y: 0 }}
            style={localStyles.gradientBackground}
          >
            <View style={localStyles.whiteButton}>
              <Text style={localStyles.unlockButtonText}>
                Unlock Results 🙌
              </Text>
            </View>
          </AnimatedLinearGradient>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
};

const localStyles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  buttonContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  unlockButton: {
    backgroundColor: 'linear-gradient(to right, #da70d6, #7b68ee, #87cefa)',
    borderRadius: 50,
    padding: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  gradientBackground: {
    borderRadius: 50,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    width: '90%',
  },
  whiteButton: {
    backgroundColor: 'black',
    borderRadius: 50,
    paddingVertical: 14,
    paddingHorizontal: 32,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  unlockButtonText: {
    // color: '#6200EE', // Keep the text in a bold color to stand out
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PaywallScreen;
