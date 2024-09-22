import { useAuth, useUser } from "@clerk/clerk-expo";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useLayoutEffect, useState } from "react";
import { Image, View, ActivityIndicator } from "react-native"; // {{ edit_1 }}
// import { useRevenueCat } from "@/hooks/useRevenueCat";

const Page = () => {
  const { isSignedIn } = useAuth();
  const { showOnboarding } = useLocalSearchParams();
  const { user } = useUser();
  const userId = user?.id;
  const [isPaid, setIsPaid] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false); // {{ edit_1 }}
  const router = useRouter();

  // const {
  //   priceString,
  //   revenueCatOfferings,
  //   error,
  //   handleWeeklyPurchase,
  //   customerInfo,
  // } = useRevenueCat();

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  // useEffect(() => {
  //   if (mounted) {
  //     if (isSignedIn && userId) {
  //       console.log(userId);
  //       if (customerInfo) {
  //         console.log(
  //           "purchases from index: ",
  //           JSON.stringify(customerInfo, null, 2)
  //         );

  //         if (customerInfo.activeSubscriptions.length > 0) {
  //           router.replace("/(home)");
  //         } else {
  //           router.replace("/(auth)/welcome");
  //           // router.replace("/(home)");
  //         }
  //       }
  //       if (error) {
  //         console.error("RevenueCat Error:", error);
  //         router.replace("/(auth)/welcome");
  //       }
  //     } else {
  //       router.replace("/(auth)/sign-in");
  //     }
  //   }
  // }, [customerInfo, error, isSignedIn]);

  useEffect(() => {
    if (mounted) {
      // if (isSignedIn && userId) {
      //   console.log(userId);
      //   if (customerInfo) {
      //     console.log(
      //       "purchases from index: ",
      //       JSON.stringify(customerInfo, null, 2)
      //     );
      //     if (customerInfo.activeSubscriptions.length > 0) {
      //       router.replace("/(home)");
      //     } else {
      //       router.replace("/(auth)/welcome");
      //       // router.replace("/(home)");
      //     }
      //   }
      //   if (error) {
      //     console.error("RevenueCat Error:", error);
      //     router.replace("/(auth)/welcome");
      //   }
      // } else {
      //   router.replace("/(auth)/sign-in");
      // }

      router.replace("/(auth)/welcome");
    }
  }, [mounted]);

  if (loading) {
    return (
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
