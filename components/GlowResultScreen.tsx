import { styles } from '@/constants/onboarding';
import { useGlowResultStore } from '@/store/glowResultStore';
import { useImageStore } from '@/store/imageStore';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  ScrollView as RNScrollView,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const GlowResultScreen = () => {
  const { glowResult } = useGlowResultStore();
  const [activeTab, setActiveTab] = useState('Ratings');
  const insets = useSafeAreaInsets();
  const images = useImageStore((state) => state.images);

  if (!glowResult) {
    return (
      <View style={localStyles.container}>
        <Text>No glow result available</Text>
      </View>
    );
  }

  const { scores, percentile, facialCharacteristics, skinAnalysis } =
    glowResult as any;

  const ScoreCard: React.FC<{ title: string; score: number }> = ({
    title,
    score,
  }) => (
    <View style={localStyles.scoreCard}>
      <View className='flex flex-row justify-between items-center mb-3 flex-wrap'>
        <Text style={localStyles.scoreTitle}>{title}</Text>
        <Text style={localStyles.scoreValue}>{score.toFixed(1)}</Text>
      </View>
      <View style={localStyles.progressBar}>
        <LinearGradient
          colors={['#da70d6', '#7b68ee', '#87cefa']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[
            localStyles.progressFill,
            { width: `${(score / 10) * 100}%` },
          ]}
        />
      </View>
    </View>
  );

  const CharacteristicItem = ({
    title,
    value,
  }: {
    title: string;
    value: string;
  }) => (
    <View style={localStyles.characteristicItem} className='shadow-md'>
      <Text style={localStyles.characteristicTitle}>{title}:</Text>
      <Text style={localStyles.characteristicValue}>{value}</Text>
    </View>
  );

  const CharacteristicCard = ({
    title,
    value,
  }: {
    title: string;
    value: string;
  }) => (
    <View style={localStyles.characteristicCard}>
      <Text style={localStyles.characteristicTitle}>{title}</Text>
      <Text style={localStyles.characteristicValue}>{value}</Text>
    </View>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Ratings':
        return (
          <View style={localStyles.scoresContainer}>
            <View style={localStyles.scoreRow}>
              <ScoreCard title='Overall' score={scores.overall} />
              <ScoreCard title='Potential' score={scores.potential} />
            </View>
            <View style={localStyles.scoreRow}>
              <ScoreCard title='Skin Health' score={scores.skinHealth} />
              <ScoreCard title='Glow Factor' score={scores.glowFactor} />
            </View>
            <View style={localStyles.scoreRow}>
              <ScoreCard
                title={`Feature${'\n'}Harmony`}
                score={scores.featureHarmony}
              />
              <ScoreCard title='Authenticity' score={scores.authenticity} />
            </View>
          </View>
        );
      case 'Facial Analysis':
        return (
          <View style={localStyles.scoresContainer}>
            <View style={localStyles.scoreRow}>
              <CharacteristicCard
                title='Eye Shape'
                value={facialCharacteristics.eyeShape}
              />
              <CharacteristicCard
                title='Face Shape'
                value={facialCharacteristics.faceShape}
              />
            </View>
            <View style={localStyles.scoreRow}>
              <CharacteristicCard
                title='Jawline'
                value={facialCharacteristics.jawline}
              />
              <CharacteristicCard
                title='Lip Shape'
                value={facialCharacteristics.lipShape}
              />
            </View>
          </View>
        );
      case 'Skin Analysis':
        return (
          <View style={localStyles.scoresContainer}>
            <View style={localStyles.scoreRow}>
              <CharacteristicCard
                title='Skin Type'
                value={skinAnalysis.skinType}
              />
              <CharacteristicCard
                title='Hydration Level'
                value={skinAnalysis.hydrationLevel}
              />
            </View>
            <View style={localStyles.scoreRow}>
              <CharacteristicCard
                title='Skin Texture'
                value={skinAnalysis.skinTexture}
              />
              <CharacteristicCard
                title='Skin Tone'
                value={skinAnalysis.skinToneAndColor.join(', ')}
              />
            </View>
            <View style={localStyles.scoreRow}>
              <CharacteristicCard
                title='Skin Vitality'
                value={skinAnalysis.skinVitalityIndicators.join(', ')}
              />
            </View>
          </View>
        );
      case 'Product Recommendations':
        // Implement Product Recommendations when available
        return (
          <View style={localStyles.sectionContainer}>
            <Text>Product Recommendations coming soon...</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <ImageBackground
      source={require('@/assets/images/glow-eclipse.png')}
      // source={require('@/assets/images/screen-bg.png')}
      style={localStyles.background}
      resizeMode='cover'
    >
      {/* Add semi-transparent overlay */}
      <View style={localStyles.overlay} />

      <SafeAreaView style={localStyles.safeArea}>
        <StatusBar barStyle='dark-content' backgroundColor='#6a51ae' />

        {/* <View className='flex flex-row items-center justify-between'>
          <TouchableOpacity>
            <Ionicons name='arrow-back' size={24} color='black' />
          </TouchableOpacity>
          <Image
            source={require('@/assets/images/glow-title.png')}
            style={{ ...(styles.logo as ImageStyle), marginBottom: 0 }}
          />
        </View> */}

        <ScrollView
          style={localStyles.container}
          contentContainerStyle={localStyles.contentContainer}
        >
          <View style={localStyles.header}>
            <TouchableOpacity style={localStyles.backButton}>
              <Ionicons name='arrow-back' size={24} color='black' />
            </TouchableOpacity>
            <Text style={localStyles.centeredTitle}>Glow up guide</Text>
          </View>
          <Text style={styles.subtitle}>
            Here's your personalized glow up guide based on your facial
            analysis.
          </Text>

          <RNScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={localStyles.tabScrollView}
          >
            <View style={localStyles.tabContainer}>
              {[
                'Ratings',
                'Facial Analysis',
                'Skin Analysis',
                'Product Recommendations',
              ].map((tab) => (
                <TouchableOpacity
                  key={tab}
                  style={[
                    localStyles.tab,
                    activeTab === tab && localStyles.activeTab,
                  ]}
                  onPress={() => setActiveTab(tab)}
                >
                  <Text
                    style={[
                      localStyles.tabText,
                      activeTab === tab && localStyles.activeTabText,
                    ]}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </RNScrollView>

          <View style={localStyles.profileContainer}>
            <Image
              source={{
                uri:
                  images[0] || 'https://example.com/default-profile-image.jpg',
              }}
              style={localStyles.profileImage}
            />
            <Text
              style={localStyles.percentileText}
              className='text-center shadow-lg'
            >
              You are in the{'\n'}
              <Text style={localStyles.percentileHighlight}>
                {percentile}th percentile
              </Text>{' '}
              of all users.
            </Text>
          </View>

          {renderTabContent()}
          <View style={localStyles.buttonSpacer} />
        </ScrollView>
        <View
          style={[
            localStyles.buttonContainer,
            { paddingBottom: insets.bottom },
          ]}
        >
          {/* Gradient background */}
          <LinearGradient
            colors={['#da70d6', '#7b68ee', '#87cefa']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={localStyles.gradientBackground}
          >
            {/* White button on top of the gradient */}
            <View style={localStyles.whiteButton}>
              <Text style={localStyles.unlockButtonText}>
                Unlock Results 🙌
              </Text>
            </View>
          </LinearGradient>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const localStyles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject, // Makes the overlay cover the entire background
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Adjust opacity here (lighter background)
  },
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
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginBottom: 0,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    padding: 10,
  },
  centeredTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 0,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
  },
  activeTab: {
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
  },
  tabText: {
    color: '#666',
  },
  activeTabText: {
    color: 'black',
    fontWeight: 'bold',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 160,
    height: 160,
    borderRadius: 50,
    marginBottom: 10,
  },
  percentileText: {
    width: '80%',
    fontSize: 16,
    color: 'black',
    letterSpacing: -0.4,
    textAlign: 'center',
    marginVertical: 10,
  },
  percentileHighlight: {
    fontWeight: 'bold',
    // color: '#8835f4',
    color: '#000',
    letterSpacing: -0.4,
  },
  scoresContainer: {
    // marginBottom: 20,
  },
  scoreCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
    width: '48%',
    marginBottom: 10,
  },
  scoreTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  scoreValue: {
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  unlockButton: {
    backgroundColor: 'linear-gradient(to right, #da70d6, #7b68ee, #87cefa)',
    borderRadius: 50,
    padding: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    borderColor: 'black',
    borderWidth: 2,
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
    backgroundColor: 'white',
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
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  characteristicItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5,
  },
  characteristicTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  characteristicValue: {
    fontSize: 16,
    fontWeight: 'semibold',
    color: '#000',
  },
  tabScrollView: {
    flexGrow: 0,
    marginBottom: 20,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  characteristicCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
    width: '48%',
    marginBottom: 10,
    minHeight: 100,
    justifyContent: 'space-between',
  },
  buttonSpacer: {
    height: 80,
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
});

export default GlowResultScreen;
