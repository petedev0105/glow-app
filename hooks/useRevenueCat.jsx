// import { useState, useEffect } from "react";
// import { Platform } from "react-native";
// import { useRouter } from "expo-router";
// import Purchases from "react-native-purchases";

// const API_KEYS = {
//   ios: "appl_KwCRoyhPJbkTPAXYmbfPmFjtfJu",
//   android: "your_android_api_key",
// };

// export function useRevenueCat() {
//   const [priceString, setPriceString] = useState("");
//   const [revenueCatOfferings, setRevenueCatOfferings] = useState(null);
//   const [error, setError] = useState(null);
//   const [customerInfo, setCustomerInfo] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     Purchases.setLogLevel(Purchases.LOG_LEVEL.VERBOSE);
//     async function initializePurchases() {
//       try {
//         await Purchases.configure({ apiKey: API_KEYS[Platform.OS] });
//         console.log("RevenueCat configured successfully");

//         // Fetch and set customer info
//         const info = await Purchases.getCustomerInfo();
//         setCustomerInfo(info);
//         console.log("Customer info:", JSON.stringify(info, null, 2));

//         const isSubscribed = info.entitlements.active["glowProWeekly"];
//         if (isSubscribed) {
//           console.log("User is already subscribed. Navigating to home.");
//           router.push("/home");
//           return;
//         }

//         const offerings = await Purchases.getOfferings();
//         console.log(
//           "RevenueCat offerings:",
//           JSON.stringify(offerings, null, 2)
//         );

//         if (offerings?.current?.availablePackages?.length > 0) {
//           const weeklyPackage = offerings.current.availablePackages.find(
//             (pkg) => pkg.packageType === "WEEKLY"
//           );

//           if (weeklyPackage) {
//             const weeklyPriceString = weeklyPackage.product.priceString;
//             setPriceString(weeklyPriceString);
//             console.log("Weekly price string:", weeklyPriceString);
//           }

//           setRevenueCatOfferings(offerings);
//           console.log("Successfully set RevenueCat offerings.");
//         } else {
//           console.log("No offerings available");
//         }
//       } catch (error) {
//         console.error("Error initializing purchases:", error);
//       }
//     }

//     initializePurchases();
//   }, [router]);

//   async function handleWeeklyPurchase() {
//     console.log("handleWeeklyPurchase started");
//     try {
//       if (!revenueCatOfferings?.current?.weekly) {
//         console.log("No weekly offering available");
//         setError("No weekly offering available");
//         return;
//       }

//       console.log("Attempting purchase...");
//       const purchaseResult = await Purchases.purchasePackage(
//         revenueCatOfferings.current.weekly
//       );
//       console.log("Purchase result:", JSON.stringify(purchaseResult, null, 2));

//       const updatedCustomerInfo = await Purchases.getCustomerInfo();
//       setCustomerInfo(updatedCustomerInfo);
//       console.log(
//         "Updated customer info:",
//         JSON.stringify(updatedCustomerInfo, null, 2)
//       );

//       if (updatedCustomerInfo.entitlements.active["glowProWeekly"]) {
//         console.log("Weekly entitlement is now active");
//         router.push("/home");
//       } else {
//         console.log("Weekly entitlement is not active after purchase");
//         setError("Purchase was not successful. Please try again.");
//       }
//     } catch (error) {
//       // console.error("Error in handleWeeklyPurchase:", error);
//       if (error.userCancelled) {
//         console.log("Purchase cancelled by user");
//       } else if (error.code === Purchases.PURCHASE_NOT_ALLOWED_ERROR) {
//         console.log("Purchase not allowed");
//         setError("Purchase not allowed. Please check your account settings.");
//       } else {
//         // console.error("Unexpected error during purchase:", error);
//         setError(`An error occurred during purchase: ${error.message}`);
//       }
//     }
//     console.log("handleWeeklyPurchase completed");
//   }

//   return {
//     priceString,
//     revenueCatOfferings,
//     error,
//     handleWeeklyPurchase,
//     customerInfo,
//   };
// }
