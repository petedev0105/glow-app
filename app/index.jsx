import { useAuth, useUser } from "@clerk/clerk-expo";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useLayoutEffect, useState } from "react";
import { Image, View, ActivityIndicator } from "react-native"; // {{ edit_1 }}
import { useRevenueCat } from "@/hooks/useRevenueCat";

const Page = () => {
  const { isSignedIn } = useAuth();
  const { showOnboarding } = useLocalSearchParams();
  const { user } = useUser();
  const userId = user?.id;
  const [isPaid, setIsPaid] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false); // {{ edit_1 }}
  const router = useRouter();

  const {
    priceString,
    revenueCatOfferings,
    error,
    handleWeeklyPurchase,
    customerInfo,
  } = useRevenueCat();

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      if (isSignedIn) {
        if (customerInfo) {
          console.log(
            "purchases from index: ",
            JSON.stringify(customerInfo, null, 2)
          );

          if (customerInfo.activeSubscriptions.length > 0) {
            router.replace("/(root)/(tabs)/home");
          } else {
            router.replace("/(auth)/welcome");
          }
        }
        if (error) {
          console.error("RevenueCat Error:", error);
          router.replace("/(auth)/welcome");
        }
      } else {
        router.replace("/(auth)/sign-in");
      }
    }
  }, [customerInfo, error, isSignedIn]);

  // useEffect(() => {
  //   if (mounted) {
  //     // if (!userId) {
  //     //   // router.replace("/(auth)/welcome");
  //     //   console.log("app/index: User ID not found!");
  //     //   router.replace("/(auth)/start");
  //     // } else {
  //     //   console.log(user.id);
  //     //   // fetchPaidStatus(userId);
  //     // }

  //     // if (revenueCatOfferings) {
  //     //   console.log("revenuecat log from index file: ", revenueCatOfferings);
  //     // }

  //     if (!userId) {
  //       router.replace("/(auth)/sign-in");
  //     } else {
  //       router.replace("/(auth)/welcome");
  //     }
  //   }
  //   // router.replace("/(auth)/welcome");
  // }, [userId, mounted]); // Ensure it runs when userId or mounted changes

  if (loading) {
    return (
      // <View
      //   style={{
      //     flex: 1,
      //     backgroundColor: "white",
      //     justifyContent: "center",
      //     alignItems: "center",
      //   }}
      // >
      //   <Image
      //     source={require("../assets/images/splash.png")}
      //     style={{ width: "100%", height: "100%", resizeMode: "cover" }}
      //   />
      // </View>

      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="purple" />
      </View>
    );
  }
};

export default Page;
