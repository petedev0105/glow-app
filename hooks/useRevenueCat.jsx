import { Platform } from "react-native";
import Purchases, {
  CustomerInfo,
  PurchaseOffering,
} from "react-native-purchases";
import { useEffect, useState } from "react";

const APIKeys = {
  apple: "appl_OyCYYDefUFIOcBdNMXCujZEXwhQ",
};

const typesOfMemberships = {
  weekly: "auraweeklysubscription",
};

function useRevenueCat() {
  const [currentOffering, setCurrentOffering] = useState(null);
  const [customerInfo, setCustomerInfo] = useState(null);

  const isProMember = customerInfo?.activeSubscriptions.includes(
    typesOfMemberships.weekly
  );

  useEffect(() => {
    const fetchData = async () => {
      Purchases.setDebugLogsEnabled(true);

      if (Platform.OS == "android") {
      } else {
        await Purchases.configure({ apiKey: APIKeys.apple });
      }

      const offerings = await Purchases.getOfferings();
      const customerInfo = await Purchases.getCustomerInfo();

      setCurrentOffering(offerings.current);
      setCustomerInfo(customerInfo);

      return { offerings, customerInfo };
    };

    fetchData();
  }, []);

  useEffect(() => {
    const customerInfoUpdated = async (purchaserInfo) => {
      setCustomerInfo(purchaserInfo);
    };
    Purchases.addCustomerInfoUpdateListener(customerInfoUpdated);

    return { currentOffering, customerInfo, isProMember };
  }, []);
}

export default useRevenueCat;
