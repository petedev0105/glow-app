import LoadingSpinner from "@/components/LoadingSpinner";
import { images } from "@/constants";
import { router } from "expo-router";
import React, { useEffect } from "react";

const PushResultsScreen = () => {
  // PUSH SCANS TO DB AND WHEN DONE THEN SET NO NEED TO SET LOADING TO FALES, JUST REROUTE

  // coolio, this is smart
  useEffect(() => {
    const pushScansToDB = () => {
      console.log("pushing scans to db and rerouting...");
      // Call db here
      router.replace("/(home)");
    };

    pushScansToDB();
  }, []);

  return <LoadingSpinner bgImg={images.homeBgLarger}></LoadingSpinner>;
};

export default PushResultsScreen;
