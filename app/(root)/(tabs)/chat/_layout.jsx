import { Stack } from "expo-router";

const ChatLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="[name]" options={{ headerShown: false }} />
      <Stack.Screen name="rizz" options={{ headerShown: false }} />
      <Stack.Screen name="face" options={{ headerShown: false }} />
      <Stack.Screen name="taskChat" options={{ headerShown: false }} />
      <Stack.Screen name="auraChat" options={{ headerShown: false }} />
    </Stack>
  );
};

export default ChatLayout;
