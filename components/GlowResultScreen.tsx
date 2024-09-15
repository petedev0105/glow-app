import { images } from '@/constants';
import { styles } from '@/constants/onboarding';
import { useRecommendationsStore } from '@/store/glowRecommendationsStore';
import { useGlowResultStore } from '@/store/glowResultStore';
import { useImageStore } from '@/store/imageStore';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Animated,
  Easing,
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

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const GlowResultScreen = () => {
  const { glowResult } = useGlowResultStore();
  const [activeTab, setActiveTab] = useState('Ratings');
  const insets = useSafeAreaInsets();
  const storeImages = useImageStore((state) => state.images);
  const [unlockBtnAnimatedValue] = useState(new Animated.Value(0));

  const { recommendations } = useRecommendationsStore();

  useEffect(() => {
    if (recommendations) {
      console.log('recommendations from results screen: ', recommendations);
    }
  }, []);

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
      // apply golden gradient as a border, keep card size the same
      <LinearGradient
        colors={['#d0980c', '#fde14a', '#f8efa3', '#fde14a', '#d0980c']}
        locations={[0, 0.25, 0.5, 0.75, 1]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        style={localStyles.gradientBorderWrapper}
      >
        <View style={localStyles.innerCard}>
          {/* Regular card inside the gradient border */}
          <View style={localStyles.row}>
            <Text style={localStyles.scoreTitle}>{title}</Text>
            <Text style={localStyles.scoreValue}>{score.toFixed(1)}</Text>
          </View>
          <View style={localStyles.progressBar}>
            <LinearGradient
              colors={['#d0980c', '#eace39', '#f0d91d', '#eace39', '#d0980c']}
              locations={[0, 0.25, 0.5, 0.75, 1]}
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
      case 'Glow-Up Tips':
        // Implement Product Recommendations when available
        return (
          <ScrollView style={localStyles.scoresContainer}>
            <Text style={localStyles.summarySectionTitle}>
              {recommendations?.result[0]?.userFeaturesSummary}
            </Text>
            {recommendations?.result[0]?.steps.map((tip: any) => (
              <View key={tip.id} style={localStyles.tipCard}>
                <Text style={localStyles.tipTitle}>{tip.name}</Text>
                <Text style={localStyles.tipDetails}>{tip.details}</Text>
                <Text style={localStyles.tipImportance}>
                  Importance: {tip.importance}
                </Text>
                <Text style={localStyles.tipRelatedFeature}>
                  Related Feature: {tip.relatedFeature}
                </Text>
                <Text style={localStyles.tipExplanation}>
                  {tip.explanation}
                </Text>
              </View>
            ))}
          </ScrollView>
        );
      case 'Skincare Recommendations':
        return (
          <ScrollView style={localStyles.scoresContainer}>
            <Text style={localStyles.summarySectionTitle}>
              {recommendations?.result[1]?.userSkinSummary}
            </Text>
            {recommendations?.result[1]?.steps.map((rec: any) => (
              <View key={rec.id} style={localStyles.recCard}>
                <Text style={localStyles.recTitle}>{rec.name}</Text>
                <View style={localStyles.productSection}>
                  <Text style={localStyles.productTitle}>High-End:</Text>
                  <Text>
                    {rec.highEnd.product} - {rec.highEnd.price}
                  </Text>
                  <Text>How to use: {rec.highEnd.howToUse}</Text>
                </View>
                <View style={localStyles.productSection}>
                  <Text style={localStyles.productTitle}>Affordable:</Text>
                  <Text>
                    {rec.affordable.product} - {rec.affordable.price}
                  </Text>
                  <Text>How to use: {rec.affordable.howToUse}</Text>
                </View>
                <Text style={localStyles.recImportance}>
                  Importance: {rec.importance}
                </Text>
                <Text style={localStyles.recTechnique}>
                  Technique: {rec.technique}
                </Text>
                <Text style={localStyles.recTargetedConcern}>
                  Targeted Concern: {rec.targetedConcern}
                </Text>
                <Text style={localStyles.recExplanation}>
                  {rec.explanation}
                </Text>
              </View>
            ))}
          </ScrollView>
        );
      case 'Makeup Tips':
        return (
          <ScrollView style={localStyles.scoresContainer}>
            <Text style={localStyles.summarySectionTitle}>
              {recommendations?.result[2]?.userMakeupSummary}
            </Text>
            {recommendations?.result[2]?.steps.map((tip: any) => (
              <View key={tip.id} style={localStyles.makeupTipCard}>
                <Text style={localStyles.makeupTipTitle}>{tip.name}</Text>
                <Text style={localStyles.makeupTipTechnique}>
                  Technique: {tip.technique}
                </Text>
                <Text style={localStyles.makeupTipImportance}>
                  Importance: {tip.importance}
                </Text>
                <Text style={localStyles.makeupTipSuitableFor}>
                  Suitable For: {tip.suitableFor}
                </Text>
                <Text style={localStyles.makeupTipExplanation}>
                  {tip.explanation}
                </Text>
                {tip &&
                  tip.products &&
                  tip.products.map((product: any, index: number) => (
                    <View key={index} style={localStyles.makeupProductSection}>
                      <Text style={localStyles.makeupProductCategory}>
                        {product.category}
                      </Text>
                      <View style={localStyles.makeupProductDetails}>
                        <Text style={localStyles.makeupProductTitle}>
                          High-End:
                        </Text>
                        <Text>
                          {product.highEnd.name} - {product.highEnd.price}
                        </Text>
                        <Text>
                          Application Tip: {product.highEnd.applicationTip}
                        </Text>
                      </View>
                      <View style={localStyles.makeupProductDetails}>
                        <Text style={localStyles.makeupProductTitle}>
                          Affordable:
                        </Text>
                        <Text>
                          {product.affordable.name} - {product.affordable.price}
                        </Text>
                        <Text>
                          Application Tip: {product.affordable.applicationTip}
                        </Text>
                      </View>
                    </View>
                  ))}
                {(!tip || !tip.products) && (
                  <Text className='text-[#666]'>
                    Could not load any tips. Please try again later
                  </Text>
                )}
              </View>
            ))}
          </ScrollView>
        );
      default:
        return null;
    }
  };

  // Animate the gradient
  useEffect(() => {
    const animateGradient = () => {
      Animated.loop(
        Animated.timing(unlockBtnAnimatedValue, {
          toValue: 1, // Animate from 0 to 1
          duration: 4000, // Adjust duration as needed for speed
          easing: Easing.linear, // Linear easing for smooth looping
          useNativeDriver: false, // Must be false for gradient color animation
        })
      ).start();
    };

    animateGradient();
  }, [unlockBtnAnimatedValue]);

  // Interpolate the animated value to animate the x-coordinate of the gradient
  const animatedStartX = unlockBtnAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1], // Moving from x=0 to x=1 for start
  });

  const animatedEndX = unlockBtnAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0], // Moving from x=1 to x=0 for end
  });

  return (
    <ImageBackground
      source={images.screenBg}
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
            <TouchableOpacity
              style={localStyles.backButton}
              // TODO NAVIGATE TO DASHBOARD HOME SCREEN
              onPress={() => router.replace('/(home)')}
            >
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
                'Glow-Up Tips',
                'Skincare Recommendations',
                'Makeup Tips',
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
                  storeImages[0] ||
                  'https://example.com/default-profile-image.jpg',
              }}
              style={localStyles.profileImage}
            />
            <Text
              style={localStyles.percentileText}
              className='text-center shadow-lg'
            >
              You are in the{' '}
              <Text style={localStyles.percentileHighlight}>
                {`${percentile}th percentile`}
              </Text>{' '}
              of all users.
            </Text>
          </View>

          {renderTabContent()}
          <View style={localStyles.buttonSpacer} />
        </ScrollView>
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
    fontWeight: '600',
    // color: '#8835f4',
    color: 'black',
    letterSpacing: -0.4,
  },
  scoresContainer: {
    // marginBottom: 20,
  },
  gradientBorderWrapper: {
    borderRadius: 10,
    padding: 2,
    width: '48%',
    marginBottom: 10,
  },
  gradientBorder: {
    borderRadius: 10,
    padding: 0,
  },
  innerCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
    borderWidth: 0,
  },
  scoreCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
    width: '48%',
    marginBottom: 10,
    borderWidth: 1,
    // borderColor: '#000',
    borderColor: '#E7E7E7',
  },
  row: {
    flexDirection: 'row',
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
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 10,
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
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  characteristicValue: {
    fontSize: 14,
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
    borderWidth: 1,
    // borderColor: '#000',
    borderColor: '#E7E7E7',
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
  tipCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  tipDetails: {
    fontSize: 14,
    marginBottom: 5,
  },
  tipImportance: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  recCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  recTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productSection: {
    marginBottom: 10,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  recImportance: {
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 5,
  },
  recTechnique: {
    fontSize: 14,
    marginTop: 5,
  },
  makeupTipCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  makeupTipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  makeupTipTechnique: {
    fontSize: 14,
    marginBottom: 5,
  },
  makeupTipImportance: {
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  makeupProductSection: {
    marginBottom: 10,
  },
  makeupProductCategory: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  makeupProductDetails: {
    marginLeft: 10,
    marginBottom: 5,
  },
  makeupProductTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  summarySectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tipRelatedFeature: {
    fontSize: 14,
    marginTop: 5,
  },
  tipExplanation: {
    fontSize: 14,
    marginTop: 5,
    fontStyle: 'italic',
  },
  recTargetedConcern: {
    fontSize: 14,
    marginTop: 5,
  },
  recExplanation: {
    fontSize: 14,
    marginTop: 5,
    fontStyle: 'italic',
  },
  makeupTipSuitableFor: {
    fontSize: 14,
    marginBottom: 5,
  },
  makeupTipExplanation: {
    fontSize: 14,
    marginBottom: 10,
    fontStyle: 'italic',
  },
});

export default GlowResultScreen;
