import { images } from "@/constants";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect } from "react";
import {
  Image,
  ImageBackground,
  ImageStyle,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { styles } from "../../constants/onboarding";
import LoadingSpinner from "../LoadingSpinner";
import { useUser } from "@clerk/clerk-expo";
import { fetchAPI } from "@/lib/fetch";
import ScanResultModal from "../ScanResultModal";
import { format } from "date-fns"; // Add this import

type Scan = {
  imageUrl: string;
  glowScore: {
    scores: {
      overall: number;
      potential: number;
      glowFactor: number;
      skinHealth: number;
      authenticity: number;
      featureHarmony: number;
    };
    percentile: number;
    keyStrengths: string[];
    skinAnalysis: {
      skinType: string;
      skinTexture: string;
      skinConcerns: string[];
      hydrationLevel: string;
      skinToneAndColor: string[];
      skinVitalityIndicators: string[];
    };
    facialCharacteristics: {
      jawline: string;
      eyeShape: string;
      lipShape: string;
      faceShape: string;
    };
    enhancementSuggestions: string[];
  };
  recommendations: {
    result: Array<{
      id: number;
      steps: Array<{
        id: number;
        name: string;
        details?: string;
        highEnd?: {
          name: string;
          price: string;
          howToUse: string;
        };
        affordable?: {
          price: string;
          product: string;
          howToUse: string;
        };
        technique?: string;
        importance: string;
        explanation: string;
        targetedConcern?: string;
        relatedFeature?: string;
        products?: Array<{
          highEnd: {
            name: string;
            price: string;
            applicationTip: string;
          };
          category: string;
          affordable: {
            name: string;
            price: string;
            applicationTip: string;
          };
        }>;
        suitableFor?: string;
      }>;
      title: string;
      userFeaturesSummary?: string;
      userSkinSummary?: string;
      userMakeupSummary?: string;
    }>;
  };
  imageUrl: string; // Assuming the image is stored as a URL or path
  createdAt: string;
};

const ScansScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [scans, setScans] = useState<Scan[]>([]);
  const { user } = useUser();
  const userId = user?.id;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedScan, setSelectedScan] = useState<Scan | null>(null);

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return format(date, "dd MMM yyyy");
  };

  useEffect(() => {
    const fetchUserScans = async () => {
      if (!userId) return;
      setIsLoading(true);
      try {
        const response = await fetchAPI(
          `https://wandering-sun-9736.kiettran255.workers.dev/api/get-scan-results/${userId}`
        );
        console.log(response.data);
        const scanResults = response.data.map(
          (item: { scan_results: Scan }) => item.scan_results
        );
        console.log(scanResults);
        setScans(scanResults);
      } catch (error) {
        console.error("Error fetching user scans:", error);
        setScans([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserScans();
  }, []);

  if (isLoading) {
    return <LoadingSpinner bgImg={images.homeBgLarger}></LoadingSpinner>;
  }

  return (
    <ImageBackground
      resizeMode="cover"
      source={images.homeBgLarger}
      style={styles.container}
    >
      <SafeAreaView style={localStyles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#6a51ae" />

        <View style={localStyles.logoContainer}>
          <Image source={images.glowTitle} style={styles.logo as ImageStyle} />
        </View>

        {/* Title */}
        <View style={styles.headerContainer}>
          <Text
            style={{
              ...styles.title,
              fontSize: 30,
              fontWeight: "600",
              letterSpacing: -0.8,
              marginTop: 10, // Reduce top margin
            }}
          >
            My Scans
          </Text>
          <Text
            style={{
              ...styles.title,
              fontSize: 20,
              fontWeight: "400",
              marginTop: 16,
              letterSpacing: -0.8,
            }}
          >
            View your scan history
          </Text>
        </View>

        {/* Main Content */}
        <View style={{ ...styles.contentContainer, marginTop: 20, flex: 4.5 }}>
          <ScrollView
            style={localStyles.scrollView}
            contentContainerStyle={{
              paddingHorizontal: 20,
              paddingBottom: 30,
              width: "100%",
              marginBottom: 10,
            }}
            showsVerticalScrollIndicator={false}
          >
            {scans.map((scan, index) => (
              <TouchableOpacity
                key={index}
                style={localStyles.scanCard}
                className="shadow-sm"
                onPress={() => {
                  setSelectedScan(scan);
                  setModalVisible(true);
                }}
              >
                <Image
                  source={{ uri: scan.imageUrl }}
                  style={localStyles.scanImage}
                />

                <View style={localStyles.scanDetails}>
                  <Text style={localStyles.scanTitle}>Glow Up Scan</Text>
                  {/* <Text style={localStyles.scanDate}>
                    {formatDate(scan.createdAt)}
                  </Text> */}

                  <View style={localStyles.scoreContainer}>
                    <Text style={localStyles.scoreText}>Overall</Text>
                    <Text style={localStyles.scoreValue}>
                      {scan.glowScore.scores.overall}
                    </Text>
                    <Text style={localStyles.scoreText}>Potential</Text>
                    <Text style={localStyles.scoreValue}>
                      {scan.glowScore.scores?.potential}
                    </Text>
                    <Text style={localStyles.scoreText}>+4</Text>
                  </View>

                  <View style={localStyles.progressBar}>
                    <LinearGradient
                      colors={["#9B84FF", "#9B84FF"]}
                      style={[
                        localStyles.progressFill,
                        {
                          width: `${scan.glowScore.scores?.overall * 10}%`,
                        },
                      ]}
                    />
                    <LinearGradient
                      colors={["#C7E9FF", "#C7E9FF"]}
                      style={[
                        localStyles.progressFill,
                        {
                          width: `${scan.glowScore.scores?.potential * 10 - scan.glowScore.scores?.overall * 10}%`,
                          position: "absolute",
                          left: `${scan.glowScore.scores?.overall * 10}%`,
                        },
                      ]}
                    />
                  </View> */}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={{ ...styles.footerContainer, flex: 0.7 }}></View>
      </SafeAreaView>
      <ScanResultModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        scanData={selectedScan}
      />
    </ImageBackground>
  );
};

const localStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  logoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
    marginVertical: 20,
  },
  scanCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginVertical: 10,
    borderColor: "#dbdbdb",
    borderWidth: 1,
    width: "100%",
  },
  scanImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    resizeMode: "contain",
  },
  scanDetails: {
    flex: 1,
    marginLeft: 10,
  },
  scanTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  scanDate: {
    fontSize: 12,
    color: "#6c757d",
    marginBottom: 10,
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  scoreText: {
    fontSize: 12,
    color: "#6c757d",
  },
  scoreValue: {
    fontSize: 16,
    fontWeight: "600",
  },
  progressBar: {
    height: 6,
    backgroundColor: "#E0E0E0",
    borderRadius: 5,
    overflow: "hidden",
    marginTop: 5,
    position: "relative",
  },
  progressFill: {
    height: "100%",
    borderRadius: 5,
  },
  scrollView: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    width: "90%",
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  closeButton: {
    padding: 5,
  },
  shareButton: {
    padding: 5,
  },
  tabScrollView: {
    flexGrow: 0,
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 10, // Add horizontal padding
  },
  tabWrapper: {
    marginRight: 10,
    height: 50, // Set a fixed height for the tab wrapper
  },
  tabBase: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    minWidth: 100, // Set a minimum width for tabs
  },
  activeTab: {
    backgroundColor: "black",
  },
  inactiveTab: {
    backgroundColor: "transparent",
  },
  activeTabText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center", // Center the text
  },
  inactiveTabText: {
    color: "black",
    textAlign: "center", // Center the text
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 160,
    height: 160,
    borderRadius: 50,
    marginBottom: 10,
  },
  percentileText: {
    fontSize: 16,
    textAlign: "center",
  },
  percentileHighlight: {
    fontWeight: "bold",
  },
  scoresContainer: {
    marginBottom: 20,
  },
  scoreRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  gradientBorderWrapper: {
    borderRadius: 10,
    padding: 2,
    width: "48%",
  },
  innerCard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
  },
  scoreCard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    width: "48%",
    borderWidth: 1,
    borderColor: "#E7E7E7",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  scoreTitle: {
    fontSize: 12,
    fontWeight: "bold",
  },
  // scoreValue: {
  //   fontSize: 21,
  //   fontWeight: "bold",
  // },
  // progressBar: {
  //   height: 6,
  //   backgroundColor: "#E0E0E0",
  //   borderRadius: 5,
  //   overflow: "hidden",
  //   marginTop: 10,
  // },
  // progressFill: {
  //   height: "100%",
  //   borderRadius: 5,
  // },
  characteristicCard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    width: "48%",
    minHeight: 100,
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#E7E7E7",
  },
  characteristicTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },
  characteristicValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  summarySectionCard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E7E7E7",
  },
  summaryImage: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  accordionItem: {
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E7E7E7",
  },
  accordionHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E7E7E7",
  },
  accordionStepTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
  },
  accordionTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  accordionContent: {
    padding: 15,
  },
  boldText: {
    fontWeight: "bold",
  },
  tipDetails: {
    marginBottom: 10,
  },
  tipImportance: {
    marginBottom: 10,
  },
  tipRelatedFeature: {
    marginBottom: 10,
  },
  tipExplanation: {
    marginBottom: 10,
  },
  productSection: {
    marginBottom: 10,
  },
  productTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  howToUse: {
    marginBottom: 10,
  },
  recImportance: {
    marginBottom: 10,
  },
  recTechnique: {
    marginBottom: 10,
  },
  recTargetedConcern: {
    marginBottom: 10,
  },
  recExplanation: {
    marginBottom: 10,
  },
  makeupTipTechnique: {
    marginBottom: 10,
  },
  makeupTipImportance: {
    marginBottom: 10,
  },
  makeupTipSuitableFor: {
    marginBottom: 10,
  },
  makeupTipExplanation: {
    marginBottom: 10,
  },
  makeupProductSection: {
    marginBottom: 10,
  },
  makeupProductCategory: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  makeupProductDetails: {
    marginBottom: 10,
  },
  makeupProductTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  applicationTip: {
    marginBottom: 10,
  },
});

export default ScansScreen;
