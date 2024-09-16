import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name='start' options={{ headerShown: false }} />
      <Stack.Screen name='next-screen' options={{ headerShown: false }} />
      <Stack.Screen name='results-screen' options={{ headerShown: false }} />
      <Stack.Screen
        name='glow-results-screen'
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='unlock-results-screen'
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='facial-analysis-screen'
        options={{ headerShown: false }}
      />
      <Stack.Screen name='welcome' options={{ headerShown: false }} />
      <Stack.Screen name='sign-up' options={{ headerShown: false }} />
      <Stack.Screen name='sign-in' options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
