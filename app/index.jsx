import { useAuth, useUser } from "@clerk/clerk-expo";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useLayoutEffect, useState } from "react";
import { Image, View } from "react-native"; // {{ edit_1 }}

const Page = () => {
  const { isSignedIn } = useAuth();
  const { showOnboarding } = useLocalSearchParams();
  const { user } = useUser();
  const userId = user?.id;
  const [isPaid, setIsPaid] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false); // {{ edit_1 }}
  const router = useRouter();

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      if (!userId) {
        // router.replace("/(auth)/welcome");
        router.replace("/(auth)/sign-in");
      } else {
        console.log(user.id);
        fetchPaidStatus(userId);
      }
    }
    // router.replace("/(auth)/welcome");
  }, [userId, mounted]); // Ensure it runs when userId or mounted changes

  async function fetchPaidStatus(userId) {
    setLoading(true); // {{ edit_2 }}
    console.log("currently in index file...");

    // router.replace("/(auth)/welcome");

    // setLoading(false);
    try {
      const response = await fetch(`/(api)/get-user-package/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Paid Status:", data.paidStatus);
      const paidStatus = data.paidStatus;
      if (paidStatus && !showOnboarding) {
        router.replace("/(root)/(tabs)/home");
      } else if (!showOnboarding) {
        router.replace("/(auth)/welcome");
      } else {
      }
    } catch (error) {
      setLoading(false);
      // console.error("Failed to fetch paid status:", error);
      router.replace("/(auth)/welcome");
    } finally {
      setLoading(false); // {{ edit_3 }}
      router.replace("/(auth)/welcome");
    }
  } // Ensure userId is defined

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
        <Image
          source={require("../assets/images/splash.png")}
          style={{ width: 100, height: 100 }}
        ></Image>
      </View>
    );
  }

  // return (
  //   <View
  //     style={{
  //       flex: 1,
  //       backgroundColor: "black",
  //       justifyContent: "center",
  //       alignItems: "center",
  //     }}
  //   >
  //     <TouchableOpacity
  //       className="w-full p-5 border pt-12 rounded-full"
  //       onPress={() => router.replace("/(auth)/welcome")}
  //     >
  //       <Text className="text-white">Welcome</Text>
  //     </TouchableOpacity>
  //   </View>
  // );
};

export default Page;
