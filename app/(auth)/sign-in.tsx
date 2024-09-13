import glowTitle from '@/assets/images/glow-title.png';
import { AuthScreen } from '@/components/OnboardingScreens/authScreen';
import { styles } from '@/constants/onboarding';
import { useAuth } from '@clerk/clerk-expo';
import { router } from 'expo-router';
import { useEffect } from 'react';
import {
  Image,
  ImageStyle,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

const SignIn = () => {
  // const [signInComplete, setSignInComplete] = useState(false);
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (isSignedIn) {
      router.replace('/(auth)/welcome');
    }
  }, [isSignedIn]);

  return (
    <SafeAreaView className='flex h-full bg-white'>
      <StatusBar barStyle='dark-content' backgroundColor='#6a51ae' />

      <View className='flex items-center mb-10'>
        <Image source={glowTitle} style={styles.logo as ImageStyle} />
      </View>
      <AuthScreen
        navigation={undefined}
        onNext={function (): void {
          throw new Error('Function not implemented.');
        }}
        onAuthComplete={() => {
          console.log('auth sign intriggered');
        }}
      />
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});

export default SignIn;
