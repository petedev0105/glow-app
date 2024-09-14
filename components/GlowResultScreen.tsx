import { styles } from '@/constants/onboarding';
import { useGlowResultStore } from '@/store/glowResultStore';
import { useImageStore } from '@/store/imageStore';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Image,
  Platform,
  ScrollView as RNScrollView,
  SafeAreaView,
  ScrollView,
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
      <Text style={localStyles.scoreTitle}>{title}</Text>
      <Text style={localStyles.scoreValue}>{score.toFixed(1)}</Text>
      <View style={localStyles.progressBar}>
        <View
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
    <View style={localStyles.characteristicItem}>
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
                title='Feature Harmony'
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
    <SafeAreaView style={localStyles.safeArea}>
      <ScrollView
        style={localStyles.container}
        contentContainerStyle={localStyles.contentContainer}
      >
        <View style={localStyles.header}>
          <TouchableOpacity>
            <Ionicons name='arrow-back' size={24} color='black' />
          </TouchableOpacity>
          <Text style={localStyles.headerTitle}>Glow</Text>
          <View style={{ width: 24 }} />
        </View>

        <Text style={styles.title}>Glow up guide</Text>
        <Text style={styles.subtitle}>
          Here's your personalized glow up guide based on your facial analysis.
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
              uri: images[0] || 'https://example.com/default-profile-image.jpg',
            }}
            style={localStyles.profileImage}
          />
          <Text style={localStyles.percentileText}>
            You are in the{' '}
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
        style={[localStyles.buttonContainer, { paddingBottom: insets.bottom }]}
      >
        <TouchableOpacity style={localStyles.unlockButton}>
          <Text style={localStyles.unlockButtonText}>Unlock My Results</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  // title: {
  //   fontSize: 24,
  //   fontWeight: "bold",
  //   marginBottom: 10,
  // },
  // subtitle: {
  //   fontSize: 16,
  //   color: "#666",
  //   marginBottom: 20,
  // },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
  },
  activeTab: {
    backgroundColor: '#F0E6FF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
  },
  tabText: {
    color: '#666',
  },
  activeTabText: {
    color: '#6200EE',
    fontWeight: 'bold',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  percentileText: {
    fontSize: 16,
    textAlign: 'center',
  },
  percentileHighlight: {
    color: '#6200EE',
    fontWeight: 'bold',
  },
  scoresContainer: {
    marginBottom: 20,
  },
  scoreCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
    width: '48%', // Adjust this value to control the gap between cards
    marginBottom: 10,
  },
  scoreTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  scoreValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
  },
  progressFill: {
    height: 4,
    backgroundColor: '#6200EE',
    borderRadius: 2,
  },
  unlockButton: {
    backgroundColor: '#6200EE',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
  },
  unlockButtonText: {
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
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  characteristicTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  characteristicValue: {
    fontSize: 18,
    fontWeight: 'bold',
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
    minHeight: 100, // Add this to ensure consistent height
    justifyContent: 'space-between', // Add this for better layout
  },
  buttonSpacer: {
    height: 80, // Adjust this value based on your button height
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});

export default GlowResultScreen;
