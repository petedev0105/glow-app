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

  const ScoreCard = ({
    title,
    score,
    potential,
  }: {
    title: string;
    score: number;
    potential?: boolean;
  }) =>
    potential ? (
      // Apply golden gradient as a border without changing the card size
      <LinearGradient
        colors={['#d0980c', '#fde14a', '#f8efa3', '#fde14a', '#d0980c']} // Darker on the edges, bright gold in the center
        locations={[0, 0.25, 0.5, 0.75, 1]} // Reflective effect with center highlight
        start={{ x: 0, y: 1 }} // Horizontal gradient (left to right)
        end={{ x: 1, y: 1 }}
        style={localStyles.gradientBorderWrapper} // Outer gradient border style
      >
        <View style={localStyles.innerCard}>
          {/* Regular card inside the gradient border */}
          <View style={localStyles.row}>
            <Text style={localStyles.scoreTitle}>{title}</Text>
            <Text style={localStyles.scoreValue}>{score.toFixed(1)}</Text>
          </View>
          <View style={localStyles.progressBar}>
            <LinearGradient
              colors={['#000']} // Original gradient for progress fill
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[
                localStyles.progressFill,
                { width: `${(score / 10) * 100}%` },
              ]}
            />
          </View>
        </View>
      </LinearGradient>
    ) : (
      // Regular card without gradient
      <View style={localStyles.scoreCard}>
        <View style={localStyles.row}>
          <Text style={localStyles.scoreTitle}>{title}</Text>
          <Text style={localStyles.scoreValue}>{score.toFixed(1)}</Text>
        </View>
        <View style={localStyles.progressBar}>
          <LinearGradient
            colors={['#da70d6', '#7b68ee', '#87cefa']} // Original gradient for progress fill
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
              <ScoreCard title='Potential' score={scores.potential} potential />
              <ScoreCard title='Overall' score={scores.overall} />
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
      <View style={localStyles.overlay} />

      <SafeAreaView style={localStyles.safeArea}>
        <StatusBar barStyle='dark-content' backgroundColor='#6a51ae' />

        <ScrollView
          style={localStyles.container}
          contentContainerStyle={localStyles.contentContainer}
        >
          <View style={localStyles.header}>
            <TouchableOpacity style={localStyles.backButton}>
              <Ionicons name='arrow-back' size={24} color='black' />
            </TouchableOpacity>
            <Text style={localStyles.centeredTitle}>Glow Profile</Text>
          </View>
          <Text style={styles.subtitle}>
            Here's your personalized glow profile based on your facial analysis.
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
              ].map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <View key={tab} style={localStyles.tabWrapper}>
                    <TouchableOpacity
                      style={[
                        localStyles.tabBase, // Common tab styling
                        isActive
                          ? localStyles.activeTab
                          : localStyles.inactiveTab, // Conditionally apply styles
                      ]}
                      onPress={() => setActiveTab(tab)}
                    >
                      <Text
                        style={[
                          isActive
                            ? localStyles.activeTabText
                            : localStyles.inactiveTabText,
                        ]}
                      >
                        {tab}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
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
                {`👉 ${percentile}th percentile 👈`}
              </Text>
              {'\n'}
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
    backgroundColor: 'rgba(255, 255, 255, 0.6)', // Adjust opacity here (lighter background)
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
  tabWrapper: {
    marginRight: 10,
  },
  tabBase: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: 'black',
  },
  inactiveTab: {
    backgroundColor: 'transparent',
  },
  inactiveTabText: {
    color: 'black',
  },
  activeTabText: {
    color: 'white',
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
    color: '#000',
    letterSpacing: -0.4,
    textAlign: 'center',
    marginVertical: 10,
    lineHeight: 26,
  },
  percentileHighlight: {
    fontWeight: 'bold',
    // color: '#8835f4',
    color: '#fff',
    letterSpacing: -0.4,
    backgroundColor: 'black',
  },
  scoresContainer: {
    // marginBottom: 20,
  },
  gradientBorderWrapper: {
    borderRadius: 10, // Outer layer border radius to match card
    padding: 2, // Padding to simulate the border effect
    width: '48%', // Keep the same width as the regular card
    marginBottom: 10, // Same margin as the regular card
  },
  gradientBorder: {
    borderRadius: 10, // Inner gradient border radius
    padding: 0, // No padding to ensure the card remains the same size
  },
  innerCard: {
    backgroundColor: '#F5F5F5', // Same background color as other cards
    borderRadius: 10, // Ensure same border radius for consistency
    padding: 15, // Same padding as the regular card
    borderWidth: 0, // No border since it's inside the gradient
  },
  scoreCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
    width: '48%', // Ensure it remains the same width as the gradient card
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#000', // Regular card border
  },
  row: {
    flexDirection: 'row', // Use flex-direction row instead of className for layout
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  scoreTitle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  scoreValue: {
    fontSize: 21,
    fontWeight: 'bold',
  },
  progressBar: {
    height: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 5,
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
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
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
    borderWidth: 2,
    borderColor: '#000',
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
