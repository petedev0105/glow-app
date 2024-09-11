import { Image, ScrollView, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { images } from "@/constants";

const Chat = () => {
  const router = useRouter();
  const chatbots = [
    {
      name: "StudyBuddy AI",
      icon: "school-outline",
      description:
        "Your study sidekick for acing exams with tailored plans. 📚✨",
      systemPrompt:
        "You are StudyBuddy AI, an expert in creating personalized study plans and providing academic support. Your tone is encouraging and relatable to Gen Z students. Offer concise, practical advice and be ready to explain complex topics in simple terms. Use relevant emojis occasionally to enhance engagement.",
    },
    {
      name: "FitPal AI",
      icon: "fitness-outline",
      description:
        "Custom workouts and nutrition hacks to crush your fitness goals! 💪🥗",
      systemPrompt:
        "You are FitPal AI, a knowledgeable fitness coach and nutritionist. Your advice is tailored for Gen Z, focusing on achievable, trendy workouts and sustainable eating habits. Be motivating and use a mix of scientific facts and relatable language. Incorporate fitness-related emojis when appropriate.",
    },
    {
      name: "MindfulMe AI",
      icon: "leaf-outline",
      description:
        "Chill out with guided meditations and stress-busting vibes. 🧘‍♀️🌿",
      systemPrompt:
        "You are MindfulMe AI, a calming presence specializing in mindfulness and stress management. Your language should be soothing yet appealing to Gen Z. Offer short, effective meditation techniques and practical stress-relief tips. Use calming emojis sparingly to enhance the peaceful atmosphere.",
    },
    {
      name: "CareerCoach AI",
      icon: "briefcase-outline",
      description:
        "Navigate your career journey with expert tips and inspo. 🚀💼",
      systemPrompt:
        "You are CareerCoach AI, a career advisor with expertise in modern job markets and Gen Z work culture. Provide actionable advice on job searching, skill development, and career planning. Your tone should be professional yet approachable, using current career jargon and occasional relevant emojis.",
    },
    {
      name: "FinanceGuru AI",
      icon: "cash-outline",
      description:
        "Master your money game with budgeting and investing advice. 💰📈",
      systemPrompt:
        "You are FinanceGuru AI, a financial advisor specializing in Gen Z money management. Explain complex financial concepts in simple terms, focusing on budgeting, saving, and introductory investing. Your advice should be practical and tailored to young adults. Use finance-related emojis to illustrate points when relevant.",
    },
  ];

  const newTools = [
    {
      name: "RizzAura AI",
      icon: "sparkles-outline",
      description: "Upload screenshot and get rizz ideas✨",
      systemPrompt:
        "You are RizzAura AI, a guide to enhancing social interactions and charisma. Provide tips and techniques for building confidence and improving social skills.",
    },
    {
      name: "LooksMax Aura AI",
      icon: "star-outline",
      description: "Maximize your looks 💅",
      systemPrompt:
        "You are LooksMax Aura AI, specializing in personal grooming and style advice. Offer practical tips for enhancing appearance and building self-confidence.",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-black p-5">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* <Text className="text-2xl font-JakartaBold mb-5">Improve</Text> */}

        {/* <View className="mb-8">
          <Text className="text-xl font-JakartaBold mb-3">Aura Tools</Text>
          {newTools.map((tool, index) => (
            <TouchableOpacity
              key={index}
              className="flex-row items-center justify-between py-3 border-b border-gray-200"
              onPress={() => {
                if (tool.name === "RizzAura AI") {
                  router.push("/(root)/(tabs)/chat/rizz"); // Navigate to RizzAura
                } else if (tool.name === "LooksMax Aura AI") {
                  router.push("/(root)/(tabs)/chat/face"); // Navigate to RizzAura
                }
              }}
            >
              <View className="flex-row items-center">
                <Ionicons name={tool.icon} size={24} color="#4B5563" />
                <View className="ml-3">
                  <Text className="text-base font-JakartaMedium">
                    {tool.name}
                  </Text>
                  <Text className="text-sm text-gray-500">
                    {tool.description.length > 30
                      ? `${tool.description.substring(0, 30)}...`
                      : tool.description}
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#4B5563" />
            </TouchableOpacity>
          ))}
        </View> */}

        <View className="mb-8">
          <Text className="text-xl text-white font-JakartaBold mb-3">
            Aura Coaches
          </Text>
          {chatbots.map((bot, index) => (
            <TouchableOpacity
              key={index}
              className="flex-row items-center justify-between py-3 border-b border-gray-200"
              onPress={() =>
                router.push(
                  `/(root)/(tabs)/chat/${bot.name}?prompt=${encodeURIComponent(bot.systemPrompt)}`
                )
              }
            >
              <View className="flex-row items-center">
                <Ionicons name={bot.icon} size={24} color="white" />
                <View className="ml-3">
                  <Text className="text-white font-JakartaMedium">
                    {bot.name}
                  </Text>
                  <Text className="text-sm text-gray-500">
                    {bot.description.length > 30
                      ? `${bot.description.substring(0, 30)}...`
                      : bot.description}
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#4B5563" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Chat;
