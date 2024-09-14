import { styles } from "@/constants/onboarding";
import { useGlowResultStore } from "@/store/glowResultStore";
import { useImageStore } from "@/store/imageStore";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect } from "react";
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
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRecommendationsStore } from "@/store/glowRecommendationsStore";

const GlowResultScreen = () => {
  const { glowResult } = useGlowResultStore();
  const [activeTab, setActiveTab] = useState("Ratings");
  const insets = useSafeAreaInsets();
  const images = useImageStore((state) => state.images);
  const { recommendations } = useRecommendationsStore();

  useEffect(() => {
    if (recommendations) {
      console.log("recommendations from results screen: ", recommendations);
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

  const ScoreCard: React.FC<{ title: string; score: number }> = ({
    title,
    score,
  }) => (
    <View style={localStyles.scoreCard}>
      <View className="flex flex-row justify-between items-center mb-3 flex-wrap">
        <Text style={localStyles.scoreTitle}>{title}</Text>
        <Text style={localStyles.scoreValue}>{score.toFixed(1)}</Text>
      </View>
      <View style={localStyles.progressBar}>
        <LinearGradient
          colors={["#da70d6", "#7b68ee", "#87cefa"]}
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
      case "Ratings":
        return (
          <View style={localStyles.scoresContainer}>
            <View style={localStyles.scoreRow}>
              <ScoreCard title="Overall" score={scores.overall} />
              <ScoreCard title="Potential" score={scores.potential} />
            </View>
            <View style={localStyles.scoreRow}>
              <ScoreCard title="Skin Health" score={scores.skinHealth} />
              <ScoreCard title="Glow Factor" score={scores.glowFactor} />
            </View>
            <View style={localStyles.scoreRow}>
              <ScoreCard
                title={`Feature${"\n"}Harmony`}
                score={scores.featureHarmony}
              />
              <ScoreCard title="Authenticity" score={scores.authenticity} />
            </View>
          </View>
        );
      case "Facial Analysis":
        return (
          <View style={localStyles.scoresContainer}>
            <View style={localStyles.scoreRow}>
              <CharacteristicCard
                title="Eye Shape"
                value={facialCharacteristics.eyeShape}
              />
              <CharacteristicCard
                title="Face Shape"
                value={facialCharacteristics.faceShape}
              />
            </View>
            <View style={localStyles.scoreRow}>
              <CharacteristicCard
                title="Jawline"
                value={facialCharacteristics.jawline}
              />
              <CharacteristicCard
                title="Lip Shape"
                value={facialCharacteristics.lipShape}
              />
            </View>
          </View>
        );
      case "Skin Analysis":
        return (
          <View style={localStyles.scoresContainer}>
            <View style={localStyles.scoreRow}>
              <CharacteristicCard
                title="Skin Type"
                value={skinAnalysis.skinType}
              />
              <CharacteristicCard
                title="Hydration Level"
                value={skinAnalysis.hydrationLevel}
              />
            </View>
            <View style={localStyles.scoreRow}>
              <CharacteristicCard
                title="Skin Texture"
                value={skinAnalysis.skinTexture}
              />
              <CharacteristicCard
                title="Skin Tone"
                value={skinAnalysis.skinToneAndColor.join(", ")}
              />
            </View>
            <View style={localStyles.scoreRow}>
              <CharacteristicCard
                title="Skin Vitality"
                value={skinAnalysis.skinVitalityIndicators.join(", ")}
              />
            </View>
          </View>
        );
      case "Glow-Up Tips":
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
      case "Skincare Recommendations":
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
      case "Makeup Tips":
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
                {tip.products.map((product: any, index: number) => (
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
              </View>
            ))}
          </ScrollView>
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
            <Ionicons name="arrow-back" size={24} color="black" />
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
              "Ratings",
              "Facial Analysis",
              "Skin Analysis",
              "Glow-Up Tips",
              "Skincare Recommendations",
              "Makeup Tips",
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
              uri: images[0] || "https://example.com/default-profile-image.jpg",
            }}
            style={localStyles.profileImage}
          />
          <Text style={localStyles.percentileText}>
            You are in the{" "}
            <Text style={localStyles.percentileHighlight}>
              {percentile}th percentile
            </Text>{" "}
            of all users.
          </Text>
        </View>

        {renderTabContent()}
        <View style={localStyles.buttonSpacer} />
      </ScrollView>
      <View
        style={[localStyles.buttonContainer, { paddingBottom: insets.bottom }]}
      >
        <LinearGradient
          colors={["#da70d6", "#7b68ee", "#87cefa"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={localStyles.unlockButton}
        >
          <Text style={localStyles.unlockButtonText}>Unlock</Text>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  tabContainer: {
    flexDirection: "row",
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
    borderColor: "black",
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
  },
  tabText: {
    color: "#666",
  },
  activeTabText: {
    color: "black",
    fontWeight: "bold",
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  percentileText: {
    width: "80%",
    fontSize: 16,
    color: "black",
    letterSpacing: -0.4,
    textAlign: "center",
    marginVertical: 10,
  },
  percentileHighlight: {
    fontWeight: "bold",
    color: "#9b5dd9",
    letterSpacing: -0.4,
  },
  scoresContainer: {
    // marginBottom: 20,
  },
  scoreCard: {
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    padding: 15,
    width: "48%",
    marginBottom: 10,
  },
  scoreTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
  },
  scoreValue: {
    fontSize: 21,
    fontWeight: "bold",
    marginBottom: 5,
  },
  progressBar: {
    height: 4,
    backgroundColor: "#E0E0E0",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 2,
  },
  unlockButton: {
    backgroundColor: "linear-gradient(to right, #da70d6, #7b68ee, #87cefa)",
    borderRadius: 50,
    padding: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  unlockButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  characteristicItem: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 5,
  },
  characteristicTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  characteristicValue: {
    fontSize: 16,
    fontWeight: "semibold",
    color: "#000",
  },
  tabScrollView: {
    flexGrow: 0,
    marginBottom: 20,
  },
  scoreRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  characteristicCard: {
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    padding: 15,
    width: "48%",
    marginBottom: 10,
    minHeight: 100,
    justifyContent: "space-between",
  },
  buttonSpacer: {
    height: 80,
  },
  buttonContainer: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    left: 0,
    right: 0,
    // backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
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
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  tipDetails: {
    fontSize: 14,
    marginBottom: 5,
  },
  tipImportance: {
    fontSize: 14,
    fontStyle: "italic",
  },
  recCard: {
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  recTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  productSection: {
    marginBottom: 10,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  recImportance: {
    fontSize: 14,
    fontStyle: "italic",
    marginTop: 5,
  },
  recTechnique: {
    fontSize: 14,
    marginTop: 5,
  },
  makeupTipCard: {
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  makeupTipTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  makeupTipTechnique: {
    fontSize: 14,
    marginBottom: 5,
  },
  makeupTipImportance: {
    fontSize: 14,
    fontStyle: "italic",
    marginBottom: 10,
  },
  makeupProductSection: {
    marginBottom: 10,
  },
  makeupProductCategory: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  makeupProductDetails: {
    marginLeft: 10,
    marginBottom: 5,
  },
  makeupProductTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  summarySectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  tipRelatedFeature: {
    fontSize: 14,
    marginTop: 5,
  },
  tipExplanation: {
    fontSize: 14,
    marginTop: 5,
    fontStyle: "italic",
  },
  recTargetedConcern: {
    fontSize: 14,
    marginTop: 5,
  },
  recExplanation: {
    fontSize: 14,
    marginTop: 5,
    fontStyle: "italic",
  },
  makeupTipSuitableFor: {
    fontSize: 14,
    marginBottom: 5,
  },
  makeupTipExplanation: {
    fontSize: 14,
    marginBottom: 10,
    fontStyle: "italic",
  },
});

export default GlowResultScreen;
